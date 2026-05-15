// ============================================
// 健康评分组件
// ============================================
import React from 'react';
import { MicrobiomeAnalysis } from '../types';
import { getScoreColor, getScoreLevel, getScoreBgColor } from '../utils/helpers';

interface HealthScoreProps {
  analysis: MicrobiomeAnalysis;
}

export default function HealthScore({ analysis }: HealthScoreProps) {
  const score = analysis.overallScore;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="section-title">🦠 肠道健康评分</h3>

      <div className="flex flex-col items-center">
        {/* 环形评分 */}
        <div className="relative w-36 h-36">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* 背景环 */}
            <circle cx="60" cy="60" r="54" fill="none" stroke="#2d2e34" strokeWidth="8" />
            {/* 评分环 */}
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a6df5" />
                <stop offset="100%" stopColor="#1aae6f" />
              </linearGradient>
            </defs>
          </svg>
          {/* 分数文字 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
            <span className="text-xs text-gray-500">/ 100</span>
          </div>
        </div>

        {/* 评分等级 */}
        <div className={`mt-3 px-4 py-1.5 rounded-full bg-gradient-to-r ${getScoreBgColor(score)}`}>
          <span className={`text-sm font-medium ${getScoreColor(score)}`}>
            {getScoreLevel(score)}
          </span>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-dark-900/50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Shannon 指数</p>
          <p className="text-lg font-bold text-primary-400">{analysis.shannonIndex}</p>
          <p className="text-[10px] text-gray-600">健康值 {'>'} 3.0</p>
        </div>
        <div className="bg-dark-900/50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">F/B 比率</p>
          <p className="text-lg font-bold text-accent-400">{analysis.firmicutesBacteroidetesRatio}</p>
          <p className="text-[10px] text-gray-600">健康范围 0.5-2.0</p>
        </div>
        <div className="bg-dark-900/50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">有益菌</p>
          <p className="text-lg font-bold text-accent-400">{analysis.beneficialRatio}%</p>
          <p className="text-[10px] text-gray-600">推荐 {'>'} 30%</p>
        </div>
        <div className="bg-dark-900/50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">有害菌</p>
          <p className="text-lg font-bold text-red-400">{analysis.harmfulRatio}%</p>
          <p className="text-[10px] text-gray-600">推荐 {'<'} 10%</p>
        </div>
      </div>
    </div>
  );
}
