// ============================================
// AI 建议面板组件
// ============================================
import React from 'react';
import { MicrobiomeAnalysis, Recommendation } from '../types';

interface RecommendationPanelProps {
  analysis: MicrobiomeAnalysis;
}

function generateRecommendations(analysis: MicrobiomeAnalysis): Recommendation[] {
  const recs: Recommendation[] = [];
  let id = 1;

  if (analysis.beneficialRatio < 25) {
    recs.push({
      id: String(id++),
      category: 'diet',
      title: '增加益生菌摄入',
      description: '每天食用酸奶、开菲尔、泡菜等发酵食品，直接补充有益菌群。建议每天至少 200g 酸奶或 100ml 开菲尔。',
      priority: 'high',
      relatedMicrobes: ['Lactobacillus', 'Bifidobacterium'],
      icon: '🦠',
    });
    recs.push({
      id: String(id++),
      category: 'supplement',
      title: '考虑益生菌补充剂',
      description: '选择含有乳杆菌和双歧杆菌的复合益生菌补充剂，CFU 建议在 100 亿以上。',
      priority: 'medium',
      relatedMicrobes: ['Lactobacillus', 'Bifidobacterium'],
      icon: '💊',
    });
  }

  if (analysis.scfaProducers < 50) {
    recs.push({
      id: String(id++),
      category: 'diet',
      title: '增加膳食纤维',
      description: '多吃全谷物（燕麦、糙米）、根茎类蔬菜（红薯）和豆类，为短链脂肪酸产生菌提供原料。',
      priority: 'high',
      relatedMicrobes: ['Faecalibacterium', 'Roseburia'],
      icon: '🌾',
    });
  }

  if (analysis.harmfulRatio > 15) {
    recs.push({
      id: String(id++),
      category: 'diet',
      title: '减少精制糖和加工食品',
      description: '高糖饮食会促进有害菌增殖。用天然甜味（水果）替代精制糖，避免超加工食品。',
      priority: 'high',
      relatedMicrobes: ['Clostridium', 'Escherichia'],
      icon: '🚫',
    });
    recs.push({
      id: String(id++),
      category: 'diet',
      title: '食用天然抑菌食物',
      description: '大蒜、洋葱、生姜等天然食材含有抑菌成分，可帮助控制有害菌。',
      priority: 'medium',
      relatedMicrobes: ['Clostridium', 'Staphylococcus'],
      icon: '🧄',
    });
  }

  if (analysis.firmicutesBacteroidetesRatio > 2.0) {
    recs.push({
      id: String(id++),
      category: 'diet',
      title: '调整脂肪摄入比例',
      description: '减少饱和脂肪，增加 Omega-3 脂肪酸（三文鱼、亚麻籽、核桃），有助于调节 F/B 比率。',
      priority: 'medium',
      relatedMicrobes: [],
      icon: '🐟',
    });
  }

  if (analysis.shannonIndex < 2.5) {
    recs.push({
      id: String(id++),
      category: 'diet',
      title: '增加饮食多样性',
      description: '每周尝试摄入 30 种以上不同食物，每种食物都喂养不同的菌群，提高整体多样性。',
      priority: 'high',
      relatedMicrobes: [],
      icon: '🌈',
    });
  }

  recs.push({
    id: String(id++),
    category: 'lifestyle',
    title: '规律运动',
    description: '每周 150 分钟中等强度运动可以显著改善肠道菌群多样性。推荐快走、游泳、瑜伽。',
    priority: 'medium',
    relatedMicrobes: [],
    icon: '🏃',
  });

  recs.push({
    id: String(id++),
    category: 'lifestyle',
    title: '充足睡眠',
    description: '保持每晚 7-8 小时的规律睡眠。肠道菌群有昼夜节律，睡眠不足会破坏菌群平衡。',
    priority: 'medium',
    relatedMicrobes: [],
    icon: '😴',
  });

  return recs;
}

export default function RecommendationPanel({ analysis }: RecommendationPanelProps) {
  const recommendations = generateRecommendations(analysis);

  const priorityColors = {
    high: 'border-red-500/30 bg-red-500/5',
    medium: 'border-yellow-500/30 bg-yellow-500/5',
    low: 'border-dark-600 bg-dark-800/30',
  };

  const priorityLabels = {
    high: '高优先',
    medium: '中优先',
    low: '低优先',
  };

  const categoryLabels = {
    diet: '饮食',
    lifestyle: '生活方式',
    supplement: '补充剂',
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="section-title">💡 AI 个性化建议</h3>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={rec.id}
            className={`p-4 rounded-xl border transition-all duration-300 hover:translate-x-1 ${priorityColors[rec.priority]}`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{rec.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-200">{rec.title}</h4>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {priorityLabels[rec.priority]}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-dark-700 text-gray-500">
                    {categoryLabels[rec.category]}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{rec.description}</p>
                {rec.relatedMicrobes.length > 0 && (
                  <div className="flex gap-1.5 mt-2">
                    {rec.relatedMicrobes.map(m => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
