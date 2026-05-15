// ============================================
// 饮食追踪组件
// ============================================
import React, { useState, useMemo } from 'react';
import { FoodLog, Macronutrients, FoodItem } from '../types';
import { FOOD_DATABASE } from '../data/foods';
import { generateId, getMealTypeLabel, getMealTypeIcon, formatCalories, formatGrams } from '../utils/helpers';
import { calcFoodNutrition, mergeMacros, DAILY_RECOMMENDED, calcNutritionAdherence } from '../engine/nutritionCalc';

interface FoodLoggerProps {
  onLogChange?: (logs: FoodLog[]) => void;
}

export default function FoodLogger({ onLogChange }: FoodLoggerProps) {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [selectedFoods, setSelectedFoods] = useState<{ food: FoodItem; amount: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPanel, setShowAddPanel] = useState(false);

  const filteredFoods = useMemo(() => {
    if (!searchTerm) return FOOD_DATABASE;
    return FOOD_DATABASE.filter(f =>
      f.name.includes(searchTerm) || f.tags.some(t => t.includes(searchTerm))
    );
  }, [searchTerm]);

  const todayLogs = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return logs.filter(l => l.date === today);
  }, [logs]);

  const todayNutrition = useMemo(() => {
    if (todayLogs.length === 0) return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    return mergeMacros(...todayLogs.map(l => l.totalNutrition));
  }, [todayLogs]);

  const adherence = calcNutritionAdherence(todayNutrition, DAILY_RECOMMENDED);

  const addFoodToSelection = (food: FoodItem) => {
    setSelectedFoods(prev => {
      const existing = prev.find(f => f.food.id === food.id);
      if (existing) {
        return prev.map(f => f.food.id === food.id ? { ...f, amount: f.amount + 1 } : f);
      }
      return [...prev, { food, amount: 1 }];
    });
  };

  const removeFoodFromSelection = (foodId: string) => {
    setSelectedFoods(prev => prev.filter(f => f.food.id !== foodId));
  };

  const submitLog = () => {
    if (selectedFoods.length === 0) return;

    const totalNutrition = mergeMacros(
      ...selectedFoods.map(sf => calcFoodNutrition(sf.food, sf.amount))
    );

    const newLog: FoodLog = {
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      mealType: selectedMeal,
      foods: selectedFoods.map(sf => ({
        foodId: sf.food.id,
        foodName: sf.food.name,
        amount: sf.amount,
      })),
      totalNutrition,
      timestamp: new Date().toISOString(),
    };

    const updated = [...logs, newLog];
    setLogs(updated);
    onLogChange?.(updated);
    setSelectedFoods([]);
    setShowAddPanel(false);
  };

  const deleteLog = (logId: string) => {
    const updated = logs.filter(l => l.id !== logId);
    setLogs(updated);
    onLogChange?.(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 今日概览 */}
      <div className="glass-card p-6 glow-border">
        <h3 className="section-title">📝 今日饮食追踪</h3>
        <p className="text-xs text-gray-500 mb-4">{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        {/* 营养进度 */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {[
            { label: '热量', current: todayNutrition.calories, target: DAILY_RECOMMENDED.calories, unit: '千卡', color: 'text-accent-400' },
            { label: '蛋白质', current: todayNutrition.protein, target: DAILY_RECOMMENDED.protein, unit: 'g', color: 'text-primary-400' },
            { label: '碳水', current: todayNutrition.carbs, target: DAILY_RECOMMENDED.carbs, unit: 'g', color: 'text-yellow-400' },
            { label: '脂肪', current: todayNutrition.fat, target: DAILY_RECOMMENDED.fat, unit: 'g', color: 'text-red-400' },
            { label: '纤维', current: todayNutrition.fiber, target: DAILY_RECOMMENDED.fiber, unit: 'g', color: 'text-purple-400' },
          ].map(item => {
            const pct = Math.min(100, Math.round((item.current / item.target) * 100));
            return (
              <div key={item.label} className="text-center">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className={`text-lg font-bold ${item.color}`}>
                  {item.unit === '千卡' ? Math.round(item.current) : item.current.toFixed(1)}
                </p>
                <p className="text-[10px] text-gray-600">/ {item.target}{item.unit}</p>
                <div className="mt-1 h-1 bg-dark-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct >= 90 && pct <= 110 ? 'bg-accent-500' : pct > 110 ? 'bg-yellow-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 遵循度 */}
        <div className="flex items-center gap-3 p-3 bg-dark-900/50 rounded-xl">
          <span className="text-2xl">{adherence.overall >= 80 ? '✅' : adherence.overall >= 60 ? '🟡' : '🔴'}</span>
          <div>
            <p className="text-sm text-gray-300">今日饮食遵循度</p>
            <p className="text-xs text-gray-500">
              {adherence.overall >= 80 ? '做得很好！继续保持' : adherence.overall >= 60 ? '还不错，有些可以调整' : '差距较大，加油哦'}
            </p>
          </div>
          <span className={`ml-auto text-xl font-bold ${adherence.overall >= 80 ? 'text-accent-400' : adherence.overall >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {adherence.overall}%
          </span>
        </div>
      </div>

      {/* 添加记录按钮 */}
      <button
        onClick={() => setShowAddPanel(true)}
        className="btn-primary w-full py-4 text-lg"
      >
        ➕ 添加饮食记录
      </button>

      {/* 添加面板 */}
      {showAddPanel && (
        <div className="glass-card p-6 border-accent-500/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-200">添加饮食记录</h4>
            <button onClick={() => setShowAddPanel(false)} className="text-gray-500 hover:text-gray-300">✕</button>
          </div>

          {/* 餐型选择 */}
          <div className="flex gap-2 mb-4">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(type => (
              <button
                key={type}
                onClick={() => setSelectedMeal(type)}
                className={`flex-1 py-2 rounded-xl text-sm transition-all ${
                  selectedMeal === type
                    ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                    : 'bg-dark-900/50 text-gray-500'
                }`}
              >
                {getMealTypeIcon(type)} {getMealTypeLabel(type)}
              </button>
            ))}
          </div>

          {/* 搜索食物 */}
          <input
            type="text"
            placeholder="🔍 搜索食物（名称或标签）..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field mb-4"
          />

          {/* 食物列表 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto mb-4">
            {filteredFoods.map(food => (
              <button
                key={food.id}
                onClick={() => addFoodToSelection(food)}
                className="text-left p-2.5 bg-dark-900/50 rounded-xl hover:bg-dark-700/50 transition-colors"
              >
                <p className="text-sm text-gray-300">{food.name}</p>
                <p className="text-[10px] text-gray-600">{food.macros.calories}千卡/{food.servingSize}</p>
              </button>
            ))}
          </div>

          {/* 已选食物 */}
          {selectedFoods.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm text-gray-400 mb-2">已选食物：</h5>
              <div className="space-y-1.5">
                {selectedFoods.map(sf => (
                  <div key={sf.food.id} className="flex items-center justify-between bg-dark-900/50 p-2.5 rounded-lg">
                    <span className="text-sm text-gray-300">{sf.food.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedFoods(prev =>
                          prev.map(f => f.food.id === sf.food.id ? { ...f, amount: Math.max(0.5, f.amount - 0.5) } : f)
                        )}
                        className="w-6 h-6 bg-dark-700 rounded text-gray-400 hover:text-white"
                      >-</button>
                      <span className="text-xs text-gray-400 w-8 text-center">{sf.amount}份</span>
                      <button
                        onClick={() => setSelectedFoods(prev =>
                          prev.map(f => f.food.id === sf.food.id ? { ...f, amount: f.amount + 0.5 } : f)
                        )}
                        className="w-6 h-6 bg-dark-700 rounded text-gray-400 hover:text-white"
                      >+</button>
                      <button
                        onClick={() => removeFoodFromSelection(sf.food.id)}
                        className="text-red-400 hover:text-red-300 text-xs ml-1"
                      >✕</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 小计 */}
              <div className="mt-3 p-3 bg-accent-500/5 border border-accent-500/20 rounded-xl">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">小计热量</span>
                  <span className="text-accent-400 font-bold">
                    {formatCalories(mergeMacros(...selectedFoods.map(sf => calcFoodNutrition(sf.food, sf.amount))).calories)}
                  </span>
                </div>
              </div>

              <button onClick={submitLog} className="btn-primary w-full mt-3">
                ✅ 保存记录
              </button>
            </div>
          )}
        </div>
      )}

      {/* 今日记录列表 */}
      {todayLogs.length > 0 && (
        <div className="glass-card p-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-4">📋 今日记录</h4>
          <div className="space-y-3">
            {todayLogs.map(log => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getMealTypeIcon(log.mealType)}</span>
                  <div>
                    <p className="text-sm text-gray-300">
                      {log.foods.map(f => f.foodName).join('、')}
                    </p>
                    <p className="text-[10px] text-gray-600">
                      {getMealTypeLabel(log.mealType)} · {formatCalories(log.totalNutrition.calories)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteLog(log.id)}
                  className="text-gray-600 hover:text-red-400 transition-colors text-sm"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {todayLogs.length === 0 && !showAddPanel && (
        <div className="text-center py-12 text-gray-600">
          <span className="text-4xl block mb-3">🍽️</span>
          <p>还没有记录，点击上方按钮添加</p>
        </div>
      )}
    </div>
  );
}
