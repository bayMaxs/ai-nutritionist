// ============================================
// 饮食方案展示组件
// ============================================
import React, { useState } from 'react';
import { DietPlan as DietPlanType, DayPlan, MealPlan as MealPlanType } from '../types';
import { formatCalories, formatGrams, getMealTypeLabel, getMealTypeIcon } from '../utils/helpers';
import { calcRecipeNutrition, mergeMacros } from '../engine/nutritionCalc';
import NutritionChart from './NutritionChart';

interface DietPlanProps {
  plan: DietPlanType;
}

export default function DietPlanView({ plan }: DietPlanProps) {
  const [selectedDay, setSelectedDay] = useState(0);
  const currentDay = plan.days[selectedDay];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 方案概览 */}
      <div className="glass-card p-6 glow-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold gradient-text">🍽️ 7 天个性化饮食方案</h2>
            <p className="text-sm text-gray-500 mt-1">
              基于您的肠道微生物组数据定制 · 生成于 {new Date(plan.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">日均热量</p>
            <p className="text-xl font-bold text-accent-400">{formatCalories(plan.weeklyNutritionAvg.calories)}</p>
          </div>
        </div>

        {/* 通用建议 */}
        <div className="flex flex-wrap gap-2">
          {plan.generalAdvice.slice(0, 3).map((advice, idx) => (
            <span key={idx} className="text-xs px-3 py-1.5 bg-dark-900/50 rounded-full text-gray-400">
              {advice}
            </span>
          ))}
        </div>
      </div>

      {/* 日期选择器 */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {plan.days.map((day, idx) => (
          <button
            key={day.day}
            onClick={() => setSelectedDay(idx)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              selectedDay === idx
                ? 'bg-gradient-to-r from-primary-600/30 to-accent-600/30 text-accent-400 border border-accent-500/30'
                : 'glass-card text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className="block text-xs opacity-60">{day.dayLabel}</span>
            <span>第{day.day}天</span>
          </button>
        ))}
      </div>

      {/* 当日详情 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 餐食列表 */}
        <div className="lg:col-span-2 space-y-4">
          {currentDay.meals.map((meal, idx) => (
            <MealCard key={idx} meal={meal} />
          ))}

          {/* 当日总营养 */}
          <div className="glass-card p-5 glow-border">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">📊 当日营养总计</h4>
            <div className="grid grid-cols-5 gap-3">
              {[
                { label: '热量', value: formatCalories(currentDay.totalNutrition.calories), color: 'text-accent-400' },
                { label: '蛋白质', value: formatGrams(currentDay.totalNutrition.protein), color: 'text-primary-400' },
                { label: '碳水', value: formatGrams(currentDay.totalNutrition.carbs), color: 'text-yellow-400' },
                { label: '脂肪', value: formatGrams(currentDay.totalNutrition.fat), color: 'text-red-400' },
                { label: '纤维', value: formatGrams(currentDay.totalNutrition.fiber), color: 'text-purple-400' },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* 营养进度条 */}
            <div className="mt-4 space-y-2">
              {[
                { label: '热量', current: currentDay.totalNutrition.calories, target: currentDay.targetNutrition.calories, color: 'bg-accent-500' },
                { label: '蛋白质', current: currentDay.totalNutrition.protein, target: currentDay.targetNutrition.protein, color: 'bg-primary-500' },
                { label: '纤维', current: currentDay.totalNutrition.fiber, target: currentDay.targetNutrition.fiber, color: 'bg-purple-500' },
              ].map(item => {
                const pct = Math.min(100, Math.round((item.current / item.target) * 100));
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{item.label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-dark-900 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="space-y-4">
          {/* 当日建议 */}
          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">💡 今日建议</h4>
            <div className="space-y-2">
              {currentDay.tips.map((tip, idx) => (
                <p key={idx} className="text-xs text-gray-400 bg-dark-900/50 p-2.5 rounded-lg">
                  {tip}
                </p>
              ))}
            </div>
          </div>

          {/* 通用建议 */}
          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">📌 饮食原则</h4>
            <div className="space-y-2">
              {plan.generalAdvice.map((advice, idx) => (
                <p key={idx} className="text-xs text-gray-400">{advice}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 单餐卡片 */
function MealCard({ meal }: { meal: MealPlanType }) {
  const nutrition = calcRecipeNutrition(meal.recipe, meal.portion);

  return (
    <div className="glass-card p-5 hover:glow-border transition-all duration-500">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getMealTypeIcon(meal.mealType)}</span>
          <div>
            <span className="text-xs text-gray-500">{getMealTypeLabel(meal.mealType)}</span>
            <h4 className="text-base font-semibold text-gray-200">{meal.recipe.name}</h4>
          </div>
        </div>
        <span className="text-sm font-bold text-accent-400">{formatCalories(nutrition.calories)}</span>
      </div>

      <p className="text-xs text-gray-500 mb-3">{meal.recipe.description}</p>

      {/* 食材列表 */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {meal.recipe.ingredients.map((ing, idx) => (
          <span key={idx} className="text-[10px] px-2 py-1 bg-dark-900/50 rounded-full text-gray-500">
            {ing.foodId} ×{ing.amount}
          </span>
        ))}
      </div>

      {/* 营养素 */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: '蛋白质', value: formatGrams(nutrition.protein), color: 'text-primary-400' },
          { label: '碳水', value: formatGrams(nutrition.carbs), color: 'text-yellow-400' },
          { label: '脂肪', value: formatGrams(nutrition.fat), color: 'text-red-400' },
          { label: '纤维', value: formatGrams(nutrition.fiber), color: 'text-purple-400' },
        ].map(item => (
          <div key={item.label} className="text-center bg-dark-900/30 rounded-lg py-1.5">
            <p className="text-[10px] text-gray-600">{item.label}</p>
            <p className={`text-xs font-medium ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* 做法（可折叠） */}
      <details className="mt-3">
        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition-colors">
          查看做法 · {meal.recipe.prepTime}分钟
        </summary>
        <ol className="mt-2 space-y-1">
          {meal.recipe.instructions.map((step, idx) => (
            <li key={idx} className="text-xs text-gray-400 flex gap-2">
              <span className="text-accent-500 font-mono">{idx + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
