// ============================================
// 饮食推荐引擎核心
// ============================================
import { MicrobiomeData, MicrobiomeAnalysis, DietPlan, DayPlan, MealPlan, Macronutrients } from '../types';
import { analyzeMicrobiome } from './microbiomeAnalysis';
import { DAILY_RECOMMENDED, adjustNutritionTarget, calcRecipeNutrition, mergeMacros } from './nutritionCalc';
import { RECIPE_DATABASE, getRecipesByMealType } from '../data/recipes';
import { generateId, getDayLabel } from '../utils/helpers';

/**
 * 根据微生物组分析结果，对食谱进行评分
 * 分数越高越适合该用户的微生物组状况
 */
function scoreRecipe(recipe: typeof RECIPE_DATABASE[0], analysis: MicrobiomeAnalysis): number {
  let score = 50; // 基础分

  // 有益菌不足 → 偏好益生菌和益生元食谱
  if (analysis.beneficialRatio < 25) {
    if (recipe.tags.includes('益生菌')) score += 20;
    if (recipe.tags.includes('益生元')) score += 15;
    if (recipe.tags.includes('发酵食品')) score += 15;
  }

  // SCFA 产生菌不足 → 偏好高纤维食谱
  if (analysis.scfaProducers < 50) {
    if (recipe.tags.includes('高纤维')) score += 15;
    if (recipe.tags.includes('抗性淀粉')) score += 10;
  }

  // 有害菌偏高 → 偏好抗炎食谱
  if (analysis.harmfulRatio > 15) {
    if (recipe.tags.includes('抗炎')) score += 15;
    if (recipe.tags.includes('Omega-3')) score += 10;
  }

  // F/B 比率偏高 → 偏好低碳水食谱
  if (analysis.firmicutesBacteroidetesRatio > 2.0) {
    if (recipe.tags.includes('低碳水')) score += 10;
  }

  // 多样性不足 → 增加随机性
  if (analysis.shannonIndex < 2.5) {
    score += Math.random() * 15;
  }

  return score;
}

/**
 * 为单餐选择最佳食谱
 */
function selectBestRecipe(
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  analysis: MicrobiomeAnalysis,
  usedRecipes: Set<string>,
): typeof RECIPE_DATABASE[0] {
  const candidates = getRecipesByMealType(mealType);

  // 评分排序
  const scored = candidates
    .map(r => ({
      recipe: r,
      score: usedRecipes.has(r.id) ? scoreRecipe(r, analysis) * 0.3 : scoreRecipe(r, analysis),
    }))
    .sort((a, b) => b.score - a.score);

  // 从 top 3 中随机选择（增加多样性）
  const topN = Math.min(3, scored.length);
  const pick = scored[Math.floor(Math.random() * topN)];

  usedRecipes.add(pick.recipe.id);
  return pick.recipe;
}

/**
 * 生成 7 天饮食方案
 */
export function generateDietPlan(microbiomeData: MicrobiomeData): DietPlan {
  const analysis = analyzeMicrobiome(microbiomeData);
  const targetNutrition = adjustNutritionTarget(DAILY_RECOMMENDED, analysis);
  const usedRecipes = new Set<string>();

  const days: DayPlan[] = [];

  for (let day = 1; day <= 7; day++) {
    // 每 3 天重置已用食谱池，允许重复但不连续
    if (day % 3 === 1) usedRecipes.clear();

    const breakfast = selectBestRecipe('breakfast', analysis, usedRecipes);
    const lunch = selectBestRecipe('lunch', analysis, usedRecipes);
    const dinner = selectBestRecipe('dinner', analysis, usedRecipes);
    const snack = selectBestRecipe('snack', analysis, usedRecipes);

    const meals: MealPlan[] = [
      { mealType: 'breakfast', recipe: breakfast, portion: 1 },
      { mealType: 'lunch', recipe: lunch, portion: 1 },
      { mealType: 'dinner', recipe: dinner, portion: 1 },
      { mealType: 'snack', recipe: snack, portion: 1 },
    ];

    const totalNutrition = mergeMacros(
      ...meals.map(m => calcRecipeNutrition(m.recipe, m.portion))
    );

    // 根据当日营养生成建议
    const tips = generateDayTips(totalNutrition, targetNutrition, analysis);

    days.push({
      day,
      dayLabel: getDayLabel(day),
      meals,
      totalNutrition,
      targetNutrition,
      tips,
    });
  }

  // 计算一周平均营养
  const weeklyNutritionAvg = mergeMacros(...days.map(d => d.totalNutrition));
  weeklyNutritionAvg.calories = Math.round(weeklyNutritionAvg.calories / 7);
  weeklyNutritionAvg.protein = parseFloat((weeklyNutritionAvg.protein / 7).toFixed(1));
  weeklyNutritionAvg.carbs = parseFloat((weeklyNutritionAvg.carbs / 7).toFixed(1));
  weeklyNutritionAvg.fat = parseFloat((weeklyNutritionAvg.fat / 7).toFixed(1));
  weeklyNutritionAvg.fiber = parseFloat((weeklyNutritionAvg.fiber / 7).toFixed(1));

  // 通用建议
  const generalAdvice = [
    '💧 每天至少饮用 2000ml 水，有助于肠道蠕动和营养吸收',
    '🕐 建议定时进餐，每餐间隔 4-5 小时',
    '🥦 每餐蔬菜占盘子的 1/2，蛋白质占 1/4，碳水占 1/4',
    '🧫 每天至少摄入一种发酵食品（酸奶、泡菜、味噌等）',
    '🌾 全谷物应占主食的 1/3 以上',
    '🍬 尽量减少精制糖和超加工食品的摄入',
  ];

  if (analysis.overallScore < 60) {
    generalAdvice.push('⚕️ 您的肠道菌群状况需要关注，建议咨询专业营养师或消化科医生');
  }

  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    microbiomeDataId: microbiomeData.id,
    analysis,
    days,
    weeklyNutritionAvg,
    generalAdvice,
  };
}

/** 生成每日饮食建议 */
function generateDayTips(
  actual: Macronutrients,
  target: Macronutrients,
  analysis: MicrobiomeAnalysis,
): string[] {
  const tips: string[] = [];

  if (actual.calories < target.calories * 0.85) {
    tips.push('📈 今日热量偏低，可适当增加健康零食');
  }
  if (actual.calories > target.calories * 1.15) {
    tips.push('📉 今日热量偏高，晚餐可适当减量');
  }
  if (actual.fiber < target.fiber * 0.7) {
    tips.push('🌾 膳食纤维不足，建议多吃蔬菜和全谷物');
  }
  if (actual.protein < target.protein * 0.8) {
    tips.push('🥩 蛋白质摄入不足，可增加鸡蛋、豆腐或鱼类');
  }

  if (tips.length === 0) {
    tips.push('✅ 今日营养搭配均衡，继续保持！');
  }

  return tips;
}
