// ============================================
// AI 营养师 - TypeScript 类型定义
// ============================================

/** 菌群丰度数据 */
export interface MicrobeAbundance {
  name: string;           // 菌群名称
  displayName: string;    // 中文显示名
  abundance: number;      // 丰度百分比 (0-100)
  category: 'beneficial' | 'harmful' | 'neutral'; // 分类
  phylum: string;         // 所属门
}

/** 微生物组检测数据 */
export interface MicrobiomeData {
  id: string;
  sampleDate: string;         // 采样日期
  microbes: MicrobeAbundance[]; // 菌群丰度列表
  metadata?: {
    age?: number;
    gender?: 'male' | 'female' | 'other';
    diet?: string;
    antibiotics?: boolean;
  };
}

/** 微生物组分析结果 */
export interface MicrobiomeAnalysis {
  shannonIndex: number;          // Shannon 多样性指数
  simpsonIndex: number;          // Simpson 多样性指数
  firmicutesBacteroidetesRatio: number; // F/B 比率
  beneficialRatio: number;       // 有益菌比例
  harmfulRatio: number;          // 有害菌比例
  scfaProducers: number;         // 短链脂肪酸产生菌水平
  overallScore: number;          // 综合健康评分 (0-100)
  dimensionScores: DimensionScore[]; // 各维度评分
  recommendations: string[];     // 分析建议
}

/** 维度评分 */
export interface DimensionScore {
  dimension: string;
  label: string;
  score: number;
  description: string;
}

/** 宏量营养素 */
export interface Macronutrients {
  calories: number;    // 千卡
  protein: number;     // 克
  carbs: number;       // 克
  fat: number;         // 克
  fiber: number;       // 克
}

/** 微量营养素 */
export interface Micronutrients {
  vitaminA: number;    // mcg
  vitaminC: number;    // mg
  vitaminD: number;    // mcg
  vitaminB12: number;  // mcg
  iron: number;        // mg
  calcium: number;     // mg
  zinc: number;        // mg
  magnesium: number;   // mg
  potassium: number;   // mg
  omega3: number;      // g
}

/** 食物营养成分 */
export interface FoodItem {
  id: string;
  name: string;
  category: 'grain' | 'vegetable' | 'fruit' | 'protein' | 'dairy' | 'fat' | 'probiotic' | 'prebiotic';
  servingSize: string;
  macros: Macronutrients;
  micros: Micronutrients;
  benefits: string[];          // 健康益处
  microbiomeImpact: string[];  // 对微生物组的影响
  tags: string[];              // 标签
}

/** 食谱 */
export interface Recipe {
  id: string;
  name: string;
  description: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: {
    foodId: string;
    amount: number;    // 份量倍数
  }[];
  totalNutrition: Macronutrients;
  prepTime: number;    // 准备时间（分钟）
  instructions: string[];
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

/** 单餐饮食计划 */
export interface MealPlan {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
  portion: number;     // 份量倍数
  notes?: string;
}

/** 每日饮食计划 */
export interface DayPlan {
  day: number;         // 第几天 (1-7)
  dayLabel: string;    // 星期标签
  meals: MealPlan[];
  totalNutrition: Macronutrients;
  targetNutrition: Macronutrients;
  tips: string[];      // 当日饮食建议
}

/** 完整的 7 天饮食方案 */
export interface DietPlan {
  id: string;
  createdAt: string;
  microbiomeDataId: string;
  analysis: MicrobiomeAnalysis;
  days: DayPlan[];
  weeklyNutritionAvg: Macronutrients;
  generalAdvice: string[];
}

/** 饮食记录 */
export interface FoodLog {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: {
    foodId: string;
    foodName: string;
    amount: number;
  }[];
  totalNutrition: Macronutrients;
  notes?: string;
  timestamp: string;
}

/** 每日饮食汇总 */
export interface DailyLogSummary {
  date: string;
  logs: FoodLog[];
  totalNutrition: Macronutrients;
  targetNutrition: Macronutrients;
  adherenceScore: number;  // 遵循方案得分 (0-100)
}

/** AI 建议 */
export interface Recommendation {
  id: string;
  category: 'diet' | 'lifestyle' | 'supplement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  relatedMicrobes: string[];
  icon: string;
}

/** API 响应 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
