// ============================================
// 营养成分图表组件
// ============================================
import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';
import { MicrobiomeAnalysis, Macronutrients } from '../types';
import { DAILY_RECOMMENDED, calcMacroPercentages, calcNutritionAdherence } from '../engine/nutritionCalc';

interface NutritionChartProps {
  analysis: MicrobiomeAnalysis;
  actualNutrition?: Macronutrients;
}

const COLORS = ['#338dff', '#1aae6f', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function NutritionChart({ analysis, actualNutrition }: NutritionChartProps) {
  // 雷达图数据
  const radarData = analysis.dimensionScores.map(ds => ({
    dimension: ds.label,
    score: ds.score,
    fullMark: 100,
  }));

  // 营养素柱状图数据
  const barData = actualNutrition
    ? (() => {
        const adherence = calcNutritionAdherence(actualNutrition, DAILY_RECOMMENDED);
        return [
          { name: '热量', actual: adherence.calories, target: 100 },
          { name: '蛋白质', actual: adherence.protein, target: 100 },
          { name: '碳水', actual: adherence.carbs, target: 100 },
          { name: '脂肪', actual: adherence.fat, target: 100 },
          { name: '纤维', actual: adherence.fiber, target: 100 },
        ];
      })()
    : [];

  // 宏量营养素饼图
  const pieData = actualNutrition
    ? (() => {
        const pcts = calcMacroPercentages(actualNutrition);
        return [
          { name: '蛋白质', value: pcts.proteinPct },
          { name: '碳水化合物', value: pcts.carbsPct },
          { name: '脂肪', value: pcts.fatPct },
        ];
      })()
    : [];

  // 菌群丰度数据（取 top 10）
  const microbeData = analysis.dimensionScores.length > 0
    ? analysis.dimensionScores.map(ds => ({
        name: ds.label,
        score: ds.score,
      }))
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 微生物组雷达图 */}
      <div className="glass-card p-6">
        <h3 className="section-title">🎯 微生物组维度评分</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#3e4047" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#9fa2aa', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#60636d', fontSize: 10 }} />
              <Radar
                name="评分"
                dataKey="score"
                stroke="#1aae6f"
                fill="#1aae6f"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1b21',
                  border: '1px solid #3e4047',
                  borderRadius: '12px',
                  color: '#e2e3e5',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 营养达标率柱状图 */}
      {actualNutrition && (
        <div className="glass-card p-6">
          <h3 className="section-title">📊 每日营养达标率</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2e34" />
                <XAxis dataKey="name" tick={{ fill: '#9fa2aa', fontSize: 12 }} />
                <YAxis domain={[0, 150]} tick={{ fill: '#60636d', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1b21',
                    border: '1px solid #3e4047',
                    borderRadius: '12px',
                    color: '#e2e3e5',
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Bar dataKey="actual" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.actual >= 90 && entry.actual <= 110 ? '#1aae6f' : entry.actual > 110 ? '#f59e0b' : '#338dff'} />
                  ))}
                </Bar>
                {/* 目标线 */}
                <Bar dataKey="target" fill="#3e4047" fillOpacity={0.3} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
            <span><span className="inline-block w-3 h-3 bg-accent-500 rounded mr-1" />达标</span>
            <span><span className="inline-block w-3 h-3 bg-primary-500 rounded mr-1" />偏低</span>
            <span><span className="inline-block w-3 h-3 bg-yellow-500 rounded mr-1" />偏高</span>
          </div>
        </div>
      )}

      {/* 宏量营养素比例 */}
      {actualNutrition && (
        <div className="glass-card p-6">
          <h3 className="section-title">🥧 宏量营养素比例</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1b21',
                    border: '1px solid #3e4047',
                    borderRadius: '12px',
                    color: '#e2e3e5',
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            推荐比例：蛋白质 15-20% · 碳水 50-60% · 脂肪 20-30%
          </p>
        </div>
      )}
    </div>
  );
}
