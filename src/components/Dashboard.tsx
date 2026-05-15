// ============================================
// 仪表盘组件
// ============================================
import React from 'react';
import { MicrobiomeData, MicrobiomeAnalysis } from '../types';
import HealthScore from './HealthScore';
import NutritionChart from './NutritionChart';
import RecommendationPanel from './RecommendationPanel';
import { formatCalories } from '../utils/helpers';

interface DashboardProps {
  microbiomeData: MicrobiomeData;
  analysis: MicrobiomeAnalysis;
}

export default function Dashboard({ microbiomeData, analysis }: DashboardProps) {
  // 菌群丰度 Top 10
  const topMicrobes = [...microbiomeData.microbes]
    .sort((a, b) => b.abundance - a.abundance)
    .slice(0, 10);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 顶部概览 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-xs text-gray-500 mb-1">综合评分</p>
          <p className="text-2xl font-bold gradient-text">{analysis.overallScore}</p>
          <p className="text-[10px] text-gray-600 mt-1">/ 100</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-gray-500 mb-1">菌群多样性</p>
          <p className="text-2xl font-bold text-primary-400">{analysis.shannonIndex}</p>
          <p className="text-[10px] text-gray-600 mt-1">Shannon 指数</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-gray-500 mb-1">有益菌占比</p>
          <p className="text-2xl font-bold text-accent-400">{analysis.beneficialRatio}%</p>
          <p className="text-[10px] text-gray-600 mt-1">推荐 {'>'} 30%</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-gray-500 mb-1">有害菌占比</p>
          <p className="text-2xl font-bold text-red-400">{analysis.harmfulRatio}%</p>
          <p className="text-[10px] text-gray-600 mt-1">推荐 {'<'} 10%</p>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：健康评分 */}
        <div className="lg:col-span-1">
          <HealthScore analysis={analysis} />
        </div>

        {/* 右侧：菌群丰度表 + 分析建议 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 菌群丰度表 */}
          <div className="glass-card p-6">
            <h3 className="section-title">🔬 菌群丰度 Top 10</h3>
            <div className="space-y-2">
              {topMicrobes.map((m, idx) => (
                <div key={m.name} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-6 text-right">{idx + 1}</span>
                  <span className="text-sm text-gray-300 w-32 truncate">{m.displayName}</span>
                  <div className="flex-1 h-5 bg-dark-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        m.category === 'beneficial'
                          ? 'bg-gradient-to-r from-accent-600 to-accent-400'
                          : m.category === 'harmful'
                          ? 'bg-gradient-to-r from-red-600 to-red-400'
                          : 'bg-gradient-to-r from-primary-600 to-primary-400'
                      }`}
                      style={{ width: `${Math.min(100, m.abundance * 3)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-gray-400 w-16 text-right">
                    {m.abundance.toFixed(1)}%
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    m.category === 'beneficial'
                      ? 'bg-accent-500/20 text-accent-400'
                      : m.category === 'harmful'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-dark-700 text-gray-500'
                  }`}>
                    {m.category === 'beneficial' ? '有益' : m.category === 'harmful' ? '有害' : '中性'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 分析建议 */}
          <div className="glass-card p-6">
            <h3 className="section-title">📋 分析建议</h3>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-dark-900/50 rounded-xl">
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 图表区 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionChart analysis={analysis} />
        <RecommendationPanel analysis={analysis} />
      </div>
    </div>
  );
}
