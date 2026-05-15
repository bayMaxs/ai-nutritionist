// ============================================
// 工具函数
// ============================================

/** 格式化数字，保留指定小数位 */
export function formatNumber(num: number, decimals: number = 1): string {
  return num.toFixed(decimals);
}

/** 格式化热量 */
export function formatCalories(cal: number): string {
  return `${Math.round(cal)} 千卡`;
}

/** 格式化克数 */
export function formatGrams(grams: number): string {
  return `${formatNumber(grams)}g`;
}

/** 获取评分颜色 */
export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-accent-400';
  if (score >= 60) return 'text-primary-400';
  if (score >= 40) return 'text-yellow-400';
  return 'text-red-400';
}

/** 获取评分背景色 */
export function getScoreBgColor(score: number): string {
  if (score >= 80) return 'from-accent-500/20 to-accent-600/10';
  if (score >= 60) return 'from-primary-500/20 to-primary-600/10';
  if (score >= 40) return 'from-yellow-500/20 to-yellow-600/10';
  return 'from-red-500/20 to-red-600/10';
}

/** 获取评分等级文字 */
export function getScoreLevel(score: number): string {
  if (score >= 90) return '优秀';
  if (score >= 80) return '良好';
  if (score >= 70) return '中等';
  if (score >= 60) return '及格';
  return '需改善';
}

/** 获取营养素进度条颜色 */
export function getNutrientColor(current: number, target: number): string {
  const ratio = current / target;
  if (ratio >= 0.9 && ratio <= 1.1) return 'bg-accent-500';
  if (ratio >= 0.7 && ratio <= 1.3) return 'bg-primary-500';
  return 'bg-yellow-500';
}

/** 生成随机 ID */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/** 日期格式化 */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

/** 星期标签 */
export function getDayLabel(day: number): string {
  const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return labels[(day - 1) % 7];
}

/** 餐型中文名 */
export function getMealTypeLabel(type: string): string {
  const map: Record<string, string> = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '零食',
  };
  return map[type] || type;
}

/** 餐型图标 */
export function getMealTypeIcon(type: string): string {
  const map: Record<string, string> = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🍎',
  };
  return map[type] || '🍽️';
}

/** 延迟函数 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** 计算百分比 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}
