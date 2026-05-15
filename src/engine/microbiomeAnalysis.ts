// ============================================
// 微生物组分析引擎
// ============================================
import { MicrobiomeData, MicrobiomeAnalysis, DimensionScore } from '../types';

/**
 * 计算 Shannon 多样性指数
 * H' = -Σ(pi * ln(pi))
 * 值越高表示菌群多样性越好，健康肠道通常 > 3.0
 */
export function calcShannonIndex(microbes: MicrobiomeData['microbes']): number {
  const total = microbes.reduce((sum, m) => sum + m.abundance, 0);
  if (total === 0) return 0;

  let h = 0;
  for (const m of microbes) {
    if (m.abundance > 0) {
      const p = m.abundance / total;
      h -= p * Math.log(p);
    }
  }
  return parseFloat(h.toFixed(3));
}

/**
 * 计算 Simpson 多样性指数
 * D = 1 - Σ(pi²)
 * 值越高表示多样性越好
 */
export function calcSimpsonIndex(microbes: MicrobiomeData['microbes']): number {
  const total = microbes.reduce((sum, m) => sum + m.abundance, 0);
  if (total === 0) return 0;

  let d = 0;
  for (const m of microbes) {
    const p = m.abundance / total;
    d += p * p;
  }
  return parseFloat((1 - d).toFixed(3));
}

/**
 * 计算 Firmicutes/Bacteroidetes 比率
 * 健康范围约 0.5-2.0，过高与肥胖相关
 */
export function calcFBRatio(microbes: MicrobiomeData['microbes']): number {
  const firmicutes = microbes
    .filter(m => m.phylum === 'Firmicutes')
    .reduce((sum, m) => sum + m.abundance, 0);
  const bacteroidetes = microbes
    .filter(m => m.phylum === 'Bacteroidetes')
    .reduce((sum, m) => sum + m.abundance, 0);

  if (bacteroidetes === 0) return 999;
  return parseFloat((firmicutes / bacteroidetes).toFixed(2));
}

/**
 * 计算有益菌比例
 */
export function calcBeneficialRatio(microbes: MicrobiomeData['microbes']): number {
  const total = microbes.reduce((sum, m) => sum + m.abundance, 0);
  if (total === 0) return 0;
  const beneficial = microbes
    .filter(m => m.category === 'beneficial')
    .reduce((sum, m) => sum + m.abundance, 0);
  return parseFloat((beneficial / total * 100).toFixed(1));
}

/**
 * 计算有害菌比例
 */
export function calcHarmfulRatio(microbes: MicrobiomeData['microbes']): number {
  const total = microbes.reduce((sum, m) => sum + m.abundance, 0);
  if (total === 0) return 0;
  const harmful = microbes
    .filter(m => m.category === 'harmful')
    .reduce((sum, m) => sum + m.abundance, 0);
  return parseFloat((harmful / total * 100).toFixed(1));
}

/**
 * 评估短链脂肪酸（SCFA）产生菌水平
 * 主要包括 Faecalibacterium, Roseburia, Eubacterium 等
 * 返回 0-100 的评分
 */
export function calcSCFAProducers(microbes: MicrobiomeData['microbes']): number {
  const scfaBacteria = ['Faecalibacterium', 'Roseburia', 'Eubacterium', 'Prevotella'];
  const total = microbes.reduce((sum, m) => sum + m.abundance, 0);
  if (total === 0) return 0;

  const scfaAbundance = microbes
    .filter(m => scfaBacteria.includes(m.name))
    .reduce((sum, m) => sum + m.abundance, 0);

  // 健康水平约 15-25%，映射到 0-100 分
  const score = Math.min(100, (scfaAbundance / 25) * 100);
  return parseFloat(score.toFixed(1));
}

/** 计算各维度评分 */
function calcDimensionScores(analysis: Partial<MicrobiomeAnalysis>): DimensionScore[] {
  const scores: DimensionScore[] = [];

  // 1. 多样性评分
  const diversityScore = Math.min(100, ((analysis.shannonIndex || 0) / 3.5) * 100);
  scores.push({
    dimension: 'diversity',
    label: '菌群多样性',
    score: parseFloat(diversityScore.toFixed(1)),
    description: diversityScore >= 70 ? '菌群多样性良好' : '多样性不足，建议增加饮食多样性',
  });

  // 2. 有益菌评分
  const beneficialScore = Math.min(100, ((analysis.beneficialRatio || 0) / 40) * 100);
  scores.push({
    dimension: 'beneficial',
    label: '有益菌水平',
    score: parseFloat(beneficialScore.toFixed(1)),
    description: beneficialScore >= 70 ? '有益菌丰度充足' : '有益菌偏低，建议补充益生菌',
  });

  // 3. 有害菌评分
  const harmfulScore = Math.max(0, 100 - (analysis.harmfulRatio || 0) * 5);
  scores.push({
    dimension: 'harmful',
    label: '有害菌控制',
    score: parseFloat(harmfulScore.toFixed(1)),
    description: harmfulScore >= 70 ? '有害菌水平可控' : '有害菌偏高，建议调整饮食',
  });

  // 4. F/B 比率评分
  const fbRatio = analysis.firmicutesBacteroidetesRatio || 1;
  const fbScore = fbRatio >= 0.5 && fbRatio <= 2.0
    ? 100 - Math.abs(fbRatio - 1.25) * 40
    : Math.max(0, 50 - Math.abs(fbRatio - 1.25) * 10);
  scores.push({
    dimension: 'fb_ratio',
    label: '菌群平衡',
    score: parseFloat(Math.max(0, fbScore).toFixed(1)),
    description: fbScore >= 70 ? 'F/B比率健康' : '菌群比例失衡，需关注饮食结构',
  });

  // 5. SCFA 产生能力
  const scfaScore = analysis.scfaProducers || 0;
  scores.push({
    dimension: 'scfa',
    label: '短链脂肪酸',
    score: parseFloat(scfaScore.toFixed(1)),
    description: scfaScore >= 60 ? 'SCFA产生充足' : '建议增加膳食纤维摄入',
  });

  return scores;
}

/** 生成分析建议 */
function generateRecommendations(analysis: Partial<MicrobiomeAnalysis>): string[] {
  const tips: string[] = [];

  if ((analysis.shannonIndex || 0) < 2.5) {
    tips.push('🥗 菌群多样性偏低：建议每周摄入30种以上不同食物，尤其是全谷物和蔬菜');
  }
  if ((analysis.beneficialRatio || 0) < 25) {
    tips.push('🦠 有益菌不足：建议每天摄入酸奶、开菲尔等发酵食品');
  }
  if ((analysis.harmfulRatio || 0) > 15) {
    tips.push('⚠️ 有害菌偏高：减少精制糖和加工食品，增加大蒜、洋葱等天然抑菌食物');
  }
  if ((analysis.firmicutesBacteroidetesRatio || 0) > 2.5) {
    tips.push('⚖️ F/B比率偏高：增加蔬菜和全谷物摄入，控制高脂饮食');
  }
  if ((analysis.scfaProducers || 0) < 40) {
    tips.push('🌾 短链脂肪酸产生菌不足：多吃红薯、燕麦等富含抗性淀粉的食物');
  }

  if (tips.length === 0) {
    tips.push('✨ 您的肠道菌群状况良好！保持当前的饮食习惯即可');
  }

  return tips;
}

/**
 * 综合分析微生物组数据
 */
export function analyzeMicrobiome(data: MicrobiomeData): MicrobiomeAnalysis {
  const shannonIndex = calcShannonIndex(data.microbes);
  const simpsonIndex = calcSimpsonIndex(data.microbes);
  const firmicutesBacteroidetesRatio = calcFBRatio(data.microbes);
  const beneficialRatio = calcBeneficialRatio(data.microbes);
  const harmfulRatio = calcHarmfulRatio(data.microbes);
  const scfaProducers = calcSCFAProducers(data.microbes);

  const partial: Partial<MicrobiomeAnalysis> = {
    shannonIndex,
    simpsonIndex,
    firmicutesBacteroidetesRatio,
    beneficialRatio,
    harmfulRatio,
    scfaProducers,
  };

  const dimensionScores = calcDimensionScores(partial);

  // 综合评分 = 各维度加权平均
  const weights = { diversity: 0.25, beneficial: 0.25, harmful: 0.2, fb_ratio: 0.15, scfa: 0.15 };
  let overallScore = 0;
  for (const ds of dimensionScores) {
    const w = weights[ds.dimension as keyof typeof weights] || 0.2;
    overallScore += ds.score * w;
  }
  overallScore = Math.round(Math.min(100, Math.max(0, overallScore)));

  const recommendations = generateRecommendations(partial);

  return {
    shannonIndex,
    simpsonIndex,
    firmicutesBacteroidetesRatio,
    beneficialRatio,
    harmfulRatio,
    scfaProducers,
    overallScore,
    dimensionScores,
    recommendations,
  };
}
