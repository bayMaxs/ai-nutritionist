// ============================================
// 食物数据库
// ============================================
import { FoodItem } from '../types';

export const FOOD_DATABASE: FoodItem[] = [
  // === 全谷物 ===
  {
    id: 'oats',
    name: '燕麦',
    category: 'grain',
    servingSize: '100g（干重）',
    macros: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6 },
    micros: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 4.7, calcium: 54, zinc: 3.97, magnesium: 177, potassium: 429, omega3: 0.11 },
    benefits: ['降低胆固醇', '稳定血糖', '促进饱腹感'],
    microbiomeImpact: ['富含β-葡聚糖，促进有益菌增殖', '提高短链脂肪酸产量'],
    tags: ['高纤维', '益生元', '全谷物'],
  },
  {
    id: 'brown_rice',
    name: '糙米',
    category: 'grain',
    servingSize: '100g（干重）',
    macros: { calories: 370, protein: 7.9, carbs: 77.2, fat: 2.9, fiber: 3.5 },
    micros: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 1.5, calcium: 23, zinc: 2.0, magnesium: 143, potassium: 223, omega3: 0.05 },
    benefits: ['提供持久能量', '富含B族维生素'],
    microbiomeImpact: ['全谷物纤维促进菌群多样性'],
    tags: ['全谷物', '无麸质'],
  },
  {
    id: 'quinoa',
    name: '藜麦',
    category: 'grain',
    servingSize: '100g（干重）',
    macros: { calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1, fiber: 7.0 },
    micros: { vitaminA: 1, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 4.6, calcium: 47, zinc: 3.1, magnesium: 197, potassium: 563, omega3: 0.26 },
    benefits: ['完全蛋白质', '富含矿物质'],
    microbiomeImpact: ['高纤维促进肠道健康', '皂苷具有抗菌作用'],
    tags: ['高蛋白', '无麸质', '超级食物'],
  },

  // === 蔬菜 ===
  {
    id: 'broccoli',
    name: '西兰花',
    category: 'vegetable',
    servingSize: '100g',
    macros: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6 },
    micros: { vitaminA: 31, vitaminC: 89.2, vitaminD: 0, vitaminB12: 0, iron: 0.7, calcium: 47, zinc: 0.4, magnesium: 21, potassium: 316, omega3: 0.01 },
    benefits: ['抗氧化', '抗炎', '增强免疫力'],
    microbiomeImpact: ['萝卜硫素促进有益菌', '纤维促进菌群多样性'],
    tags: ['十字花科', '抗氧化'],
  },
  {
    id: 'spinach',
    name: '菠菜',
    category: 'vegetable',
    servingSize: '100g',
    macros: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
    micros: { vitaminA: 469, vitaminC: 28.1, vitaminD: 0, vitaminB12: 0, iron: 2.7, calcium: 99, zinc: 0.5, magnesium: 79, potassium: 558, omega3: 0.14 },
    benefits: ['补铁', '护眼', '抗氧化'],
    microbiomeImpact: ['硝酸盐促进有益菌', '叶酸支持肠道修复'],
    tags: ['绿叶蔬菜', '高铁'],
  },
  {
    id: 'sweet_potato',
    name: '红薯',
    category: 'vegetable',
    servingSize: '100g',
    macros: { calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fiber: 3.0 },
    micros: { vitaminA: 709, vitaminC: 2.4, vitaminD: 0, vitaminB12: 0, iron: 0.6, calcium: 30, zinc: 0.3, magnesium: 25, potassium: 337, omega3: 0.01 },
    benefits: ['富含β-胡萝卜素', '稳定血糖'],
    microbiomeImpact: ['抗性淀粉作为益生元', '促进短链脂肪酸产生'],
    tags: ['抗性淀粉', '益生元'],
  },
  {
    id: 'garlic',
    name: '大蒜',
    category: 'vegetable',
    servingSize: '10g（约3瓣）',
    macros: { calories: 14, protein: 0.6, carbs: 3.3, fat: 0.1, fiber: 0.2 },
    micros: { vitaminA: 0, vitaminC: 3.1, vitaminD: 0, vitaminB12: 0, iron: 0.1, calcium: 5, zinc: 0.1, magnesium: 2, potassium: 40, omega3: 0 },
    benefits: ['天然抗菌', '增强免疫'],
    microbiomeImpact: ['大蒜素抑制有害菌', '促进乳杆菌增殖'],
    tags: ['抗菌', '益生元'],
  },
  {
    id: 'onion',
    name: '洋葱',
    category: 'vegetable',
    servingSize: '100g',
    macros: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
    micros: { vitaminA: 0, vitaminC: 7.4, vitaminD: 0, vitaminB12: 0, iron: 0.2, calcium: 23, zinc: 0.2, magnesium: 10, potassium: 146, omega3: 0 },
    benefits: ['抗氧化', '抗炎'],
    microbiomeImpact: ['富含菊粉，强效益生元', '促进双歧杆菌增殖'],
    tags: ['益生元', '菊粉'],
  },
  {
    id: 'asparagus',
    name: '芦笋',
    category: 'vegetable',
    servingSize: '100g',
    macros: { calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, fiber: 2.1 },
    micros: { vitaminA: 38, vitaminC: 5.6, vitaminD: 0, vitaminB12: 0, iron: 2.1, calcium: 24, zinc: 0.5, magnesium: 14, potassium: 202, omega3: 0 },
    benefits: ['利尿', '抗氧化'],
    microbiomeImpact: ['富含低聚果糖，促进有益菌', '天然益生元来源'],
    tags: ['益生元', '低聚果糖'],
  },

  // === 水果 ===
  {
    id: 'blueberry',
    name: '蓝莓',
    category: 'fruit',
    servingSize: '100g',
    macros: { calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4 },
    micros: { vitaminA: 3, vitaminC: 9.7, vitaminD: 0, vitaminB12: 0, iron: 0.3, calcium: 6, zinc: 0.2, magnesium: 6, potassium: 77, omega3: 0.08 },
    benefits: ['强效抗氧化', '改善认知功能'],
    microbiomeImpact: ['多酚促进有益菌增殖', '花青素改善肠道屏障'],
    tags: ['抗氧化', '超级食物'],
  },
  {
    id: 'banana',
    name: '香蕉',
    category: 'fruit',
    servingSize: '100g（约1根中等）',
    macros: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6 },
    micros: { vitaminA: 3, vitaminC: 8.7, vitaminD: 0, vitaminB12: 0, iron: 0.3, calcium: 5, zinc: 0.2, magnesium: 27, potassium: 358, omega3: 0.03 },
    benefits: ['补充钾元素', '提供能量'],
    microbiomeImpact: ['未成熟香蕉富含抗性淀粉', '促进双歧杆菌增殖'],
    tags: ['益生元', '抗性淀粉'],
  },
  {
    id: 'apple',
    name: '苹果',
    category: 'fruit',
    servingSize: '100g（约半个中等）',
    macros: { calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4 },
    micros: { vitaminA: 3, vitaminC: 4.6, vitaminD: 0, vitaminB12: 0, iron: 0.1, calcium: 6, zinc: 0.1, magnesium: 5, potassium: 107, omega3: 0.01 },
    benefits: ['富含果胶', '促进消化'],
    microbiomeImpact: ['果胶是优质益生元', '促进菌群多样性'],
    tags: ['益生元', '果胶'],
  },
  {
    id: 'kiwi',
    name: '猕猴桃',
    category: 'fruit',
    servingSize: '100g（约1个）',
    macros: { calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5, fiber: 3.0 },
    micros: { vitaminA: 4, vitaminC: 92.7, vitaminD: 0, vitaminB12: 0, iron: 0.3, calcium: 34, zinc: 0.1, magnesium: 17, potassium: 312, omega3: 0.07 },
    benefits: ['超高维C', '促进消化'],
    microbiomeImpact: ['促进肠道蠕动', '支持菌群平衡'],
    tags: ['高维C', '消化健康'],
  },

  // === 蛋白质 ===
  {
    id: 'salmon',
    name: '三文鱼',
    category: 'protein',
    servingSize: '100g',
    macros: { calories: 208, protein: 20.4, carbs: 0, fat: 13.4, fiber: 0 },
    micros: { vitaminA: 12, vitaminC: 0, vitaminD: 11.1, vitaminB12: 3.2, iron: 0.3, calcium: 12, zinc: 0.4, magnesium: 29, potassium: 363, omega3: 2.26 },
    benefits: ['富含Omega-3', '抗炎', '护心'],
    microbiomeImpact: ['Omega-3减少肠道炎症', '促进抗炎菌群'],
    tags: ['Omega-3', '抗炎'],
  },
  {
    id: 'chicken_breast',
    name: '鸡胸肉',
    category: 'protein',
    servingSize: '100g',
    macros: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    micros: { vitaminA: 6, vitaminC: 0, vitaminD: 0.1, vitaminB12: 0.3, iron: 0.4, calcium: 11, zinc: 0.7, magnesium: 29, potassium: 256, omega3: 0.04 },
    benefits: ['高蛋白低脂', '增肌'],
    microbiomeImpact: ['瘦肉蛋白不增加有害菌负担'],
    tags: ['高蛋白', '低脂'],
  },
  {
    id: 'tofu',
    name: '豆腐',
    category: 'protein',
    servingSize: '100g',
    macros: { calories: 76, protein: 8.1, carbs: 1.9, fat: 4.8, fiber: 0.3 },
    micros: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 1.6, calcium: 350, zinc: 0.6, magnesium: 58, potassium: 121, omega3: 0.37 },
    benefits: ['植物蛋白', '补钙'],
    microbiomeImpact: ['大豆异黄酮促进有益菌', '植物蛋白更利于菌群平衡'],
    tags: ['植物蛋白', '发酵食品'],
  },
  {
    id: 'eggs',
    name: '鸡蛋',
    category: 'protein',
    servingSize: '100g（约2个）',
    macros: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
    micros: { vitaminA: 160, vitaminC: 0, vitaminD: 2.0, vitaminB12: 0.9, iron: 1.8, calcium: 56, zinc: 1.3, magnesium: 12, potassium: 126, omega3: 0.07 },
    benefits: ['完全蛋白质', '富含卵磷脂'],
    microbiomeImpact: ['胆碱支持肠道屏障功能'],
    tags: ['完全蛋白质', '营养全面'],
  },

  // === 乳制品/发酵食品 ===
  {
    id: 'yogurt',
    name: '酸奶（无糖）',
    category: 'probiotic',
    servingSize: '100g',
    macros: { calories: 63, protein: 5.3, carbs: 7.0, fat: 1.6, fiber: 0 },
    micros: { vitaminA: 14, vitaminC: 0.5, vitaminD: 0, vitaminB12: 0.7, iron: 0.1, calcium: 200, zinc: 0.9, magnesium: 17, potassium: 255, omega3: 0.02 },
    benefits: ['富含益生菌', '促进消化'],
    microbiomeImpact: ['直接补充乳杆菌和双歧杆菌', '改善肠道菌群平衡'],
    tags: ['益生菌', '发酵食品'],
  },
  {
    id: 'kefir',
    name: '开菲尔',
    category: 'probiotic',
    servingSize: '100ml',
    macros: { calories: 55, protein: 3.8, carbs: 4.8, fat: 2.0, fiber: 0 },
    micros: { vitaminA: 16, vitaminC: 0, vitaminD: 0, vitaminB12: 0.4, iron: 0.1, calcium: 130, zinc: 0.5, magnesium: 12, potassium: 164, omega3: 0.01 },
    benefits: ['多种益生菌', '增强免疫'],
    microbiomeImpact: ['含30+种益生菌株', '显著改善菌群多样性'],
    tags: ['益生菌', '发酵食品', '超级食物'],
  },
  {
    id: 'kimchi',
    name: '泡菜',
    category: 'probiotic',
    servingSize: '100g',
    macros: { calories: 23, protein: 1.7, carbs: 4.0, fat: 0.1, fiber: 1.6 },
    micros: { vitaminA: 17, vitaminC: 18, vitaminD: 0, vitaminB12: 0, iron: 2.5, calcium: 33, zinc: 0.2, magnesium: 14, potassium: 151, omega3: 0 },
    benefits: ['发酵益生菌', '富含维生素'],
    microbiomeImpact: ['植物乳杆菌等益生菌丰富', '促进肠道菌群多样性'],
    tags: ['益生菌', '发酵食品'],
  },
  {
    id: 'miso',
    name: '味噌',
    category: 'probiotic',
    servingSize: '10g（约1汤匙）',
    macros: { calories: 19, protein: 1.2, carbs: 2.5, fat: 0.6, fiber: 0.5 },
    micros: { vitaminA: 1, vitaminC: 0, vitaminD: 0, vitaminB12: 0.1, iron: 0.3, calcium: 5, zinc: 0.2, magnesium: 6, potassium: 21, omega3: 0.01 },
    benefits: ['发酵大豆制品', '促进消化'],
    microbiomeImpact: ['含曲霉菌等有益菌', '发酵产物支持肠道健康'],
    tags: ['益生菌', '发酵食品'],
  },

  // === 健康脂肪 ===
  {
    id: 'avocado',
    name: '牛油果',
    category: 'fat',
    servingSize: '100g（约半个）',
    macros: { calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7, fiber: 6.7 },
    micros: { vitaminA: 7, vitaminC: 10, vitaminD: 0, vitaminB12: 0, iron: 0.6, calcium: 12, zinc: 0.6, magnesium: 29, potassium: 485, omega3: 0.11 },
    benefits: ['富含健康脂肪', '促进营养吸收'],
    microbiomeImpact: ['高纤维支持菌群多样性', '单不饱和脂肪酸抗炎'],
    tags: ['健康脂肪', '高纤维'],
  },
  {
    id: 'walnuts',
    name: '核桃',
    category: 'fat',
    servingSize: '30g（约7颗）',
    macros: { calories: 196, protein: 4.6, carbs: 4.1, fat: 19.5, fiber: 2.0 },
    micros: { vitaminA: 1, vitaminC: 0.4, vitaminD: 0, vitaminB12: 0, iron: 0.9, calcium: 31, zinc: 0.9, magnesium: 49, potassium: 132, omega3: 2.72 },
    benefits: ['富含Omega-3', '健脑'],
    microbiomeImpact: ['增加菌群多样性', '促进产丁酸菌增殖'],
    tags: ['Omega-3', '坚果'],
  },
  {
    id: 'olive_oil',
    name: '橄榄油',
    category: 'fat',
    servingSize: '15ml（1汤匙）',
    macros: { calories: 119, protein: 0, carbs: 0, fat: 13.5, fiber: 0 },
    micros: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0.1, calcium: 0, zinc: 0, magnesium: 0, potassium: 0, omega3: 0.08 },
    benefits: ['抗炎', '护心', '抗氧化'],
    microbiomeImpact: ['多酚促进有益菌', '减少肠道炎症'],
    tags: ['健康脂肪', '抗炎'],
  },
  {
    id: 'flaxseed',
    name: '亚麻籽',
    category: 'fat',
    servingSize: '15g（1汤匙）',
    macros: { calories: 80, protein: 2.7, carbs: 4.3, fat: 6.3, fiber: 3.8 },
    micros: { vitaminA: 0, vitaminC: 0.1, vitaminD: 0, vitaminB12: 0, iron: 0.8, calcium: 36, zinc: 0.6, magnesium: 56, potassium: 113, omega3: 3.24 },
    benefits: ['超高Omega-3', '促进消化'],
    microbiomeImpact: ['木酚素促进有益菌代谢', '高纤维支持菌群'],
    tags: ['Omega-3', '高纤维', '超级食物'],
  },

  // === 益生元食物 ===
  {
    id: 'chicory_root',
    name: '菊苣根',
    category: 'prebiotic',
    servingSize: '10g',
    macros: { calories: 32, protein: 0.4, carbs: 7.7, fat: 0.1, fiber: 3.6 },
    micros: { vitaminA: 1, vitaminC: 1, vitaminD: 0, vitaminB12: 0, iron: 0.2, calcium: 11, zinc: 0.1, magnesium: 4, potassium: 61, omega3: 0 },
    benefits: ['最强益生元', '促进消化'],
    microbiomeImpact: ['菊粉含量极高（65%）', '强力促进双歧杆菌增殖'],
    tags: ['益生元', '菊粉'],
  },
  {
    id: 'jerusalem_artichoke',
    name: '菊芋（洋姜）',
    category: 'prebiotic',
    servingSize: '100g',
    macros: { calories: 73, protein: 2.0, carbs: 17.4, fat: 0.01, fiber: 1.6 },
    micros: { vitaminA: 1, vitaminC: 4.0, vitaminD: 0, vitaminB12: 0, iron: 3.4, calcium: 14, zinc: 0.1, magnesium: 17, potassium: 429, omega3: 0 },
    benefits: ['富含菊粉', '调节血糖'],
    microbiomeImpact: ['菊粉含量约16%', '显著促进有益菌'],
    tags: ['益生元', '菊粉'],
  },
];

/** 按类别获取食物 */
export function getFoodsByCategory(category: FoodItem['category']): FoodItem[] {
  return FOOD_DATABASE.filter(f => f.category === category);
}

/** 获取益生元食物 */
export function getPrebioticFoods(): FoodItem[] {
  return FOOD_DATABASE.filter(f =>
    f.category === 'prebiotic' ||
    f.tags.includes('益生元') ||
    f.tags.includes('菊粉') ||
    f.tags.includes('抗性淀粉')
  );
}

/** 获取益生菌食物 */
export function getProbioticFoods(): FoodItem[] {
  return FOOD_DATABASE.filter(f => f.category === 'probiotic');
}

/** 获取抗炎食物 */
export function getAntiInflammatoryFoods(): FoodItem[] {
  return FOOD_DATABASE.filter(f => f.tags.includes('抗炎') || f.tags.includes('Omega-3'));
}

/** 获取高纤维食物 */
export function getHighFiberFoods(): FoodItem[] {
  return FOOD_DATABASE.filter(f => f.macros.fiber >= 3.0 || f.tags.includes('高纤维'));
}

/** 根据ID获取食物 */
export function getFoodById(id: string): FoodItem | undefined {
  return FOOD_DATABASE.find(f => f.id === id);
}
