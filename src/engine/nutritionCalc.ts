// ============================================
// 营养计算工具
// ============================================
import { Macronutrients, Micronutrients, FoodItem, Recipe } from '../types';

/** 每日推荐营养摄入量（成人） */
export const DAILY_RECOMMENDED: Macronutrients = {
  calories: 2000,
  protein: 65,
  carbs: 250,
  fat: 65,
  fiber: 30,
};

/** 每日推荐微量营养素 */
export const DAILY_MICRO_RECOMMENDED: Micronutrients = {
  vitaminA: 800,
  vitaminC: 100,
  vitaminD: 15,
  vitaminB12: 2.4,
  iron: 18,
  calcium: 1000,
  zinc: 12,
  magnesium: 400,
  potassium: 2600,
  omega3: 1.6,
};

/**
 * 计算食物在指定份量下的营养成分
 */
export function calcFoodNutrition(food: FoodItem, portion: number): Macronutrients {
  return {
    calories: Math.round(food.macros.calories * portion),
    protein: parseFloat((food.macros.protein * portion).toFixed(1)),
    carbs: parseFloat((food.macros.carbs * portion).toFixed(1)),
    fat: parseFloat((food.macros.fat * portion).toFixed(1)),
    fiber: parseFloat((food.macros.fiber * portion).toFixed(1)),
  };
}

/**
 * 合并多个宏量营养素
 */
export function mergeMacros(...macrosList: Macronutrients[]): Macronutrients {
  return macrosList.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: parseFloat((acc.protein + m.protein).toFixed(1)),
      carbs: parseFloat((acc.carbs + m.carbs).toFixed(1)),
      fat: parseFloat((acc.fat + m.fat).toFixed(1)),
      fiber: parseFloat((acc.fiber + m.fiber).toFixed(1)),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
}

/**
 * 计算宏量营养素占比
 */
export function calcMacroPercentages(macros: Macronutrients): {
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
} {
  const totalCalFromMacros = macros.protein * 4 + macros.carbs * 4 + macros.fat * 9;
  if (totalCalFromMacros === 0) return { proteinPct: 0, carbsPct: 0, fatPct: 0 };

  return {
    proteinPct: Math.round(((macros.protein * 4) / totalCalFromMacros) * 100),
    carbsPct: Math.round(((macros.carbs * 4) / totalCalFromMacros) * 100),
    fatPct: Math.round(((macros.fat * 9) / totalCalFromMacros) * 100),
  };
}

/**
 * 计算营养达标率
 */
export function calcNutritionAdherence(actual: Macronutrients, target: Macronutrients): {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  overall: number;
} {
  const calcPct = (a: number, t: number) => t === 0 ? 0 : Math.min(150, Math.round((a / t) * 100));

  const calories = calcPct(actual.calories, target.calories);
  const protein = calcPct(actual.protein, target.protein);
  const carbs = calcPct(actual.carbs, target.carbs);
  const fat = calcPct(actual.fat, target.fat);
  const fiber = calcPct(actual.fiber, target.fiber);
  const overall = Math.round((calories + protein + carbs + fat + fiber) / 5);

  return { calories, protein, carbs, fat, fiber, overall };
}

/**
 * 合并食谱营养成分（含份量）
 */
export function calcRecipeNutrition(recipe: Recipe, portion: number): Macronutrients {
  return {
    calories: Math.round(recipe.totalNutrition.calories * portion),
    protein: parseFloat((recipe.totalNutrition.protein * portion).toFixed(1)),
    carbs: parseFloat((recipe.totalNutrition.carbs * portion).toFixed(1)),
    fat: parseFloat((recipe.totalNutrition.fat * portion).toFixed(1)),
    fiber: parseFloat((recipe.totalNutrition.fiber * portion).toFixed(1)),
  };
}

/**
 * 根据微生物组分析调整每日营养目标
 */
export function adjustNutritionTarget(
  base: Macronutrients,
  analysis: { beneficialRatio: number; harmfulRatio: number; scfaProducers: number }
): Macronutrients {
  let fiberMultiplier = 1.0;
  let caloriesMultiplier = 1.0;

  // 有益菌不足 → 增加纤维
  if (analysis.beneficialRatio < 25) fiberMultiplier += 0.2;
  // SCFA 产生菌不足 → 增加纤维
  if (analysis.scfaProducers < 50) fiberMultiplier += 0.15;
  // 有害菌偏高 → 略减热量
  if (analysis.harmfulRatio > 15) caloriesMultiplier -= 0.05;

  return {
    calories: Math.round(base.calories * caloriesMultiplier),
    protein: base.protein,
    carbs: base.carbs,
    fat: base.fat,
    fiber: parseFloat((base.fiber * fiberMultiplier).toFixed(1)),
  };
}
