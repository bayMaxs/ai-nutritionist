// ============================================
// App 主组件
// ============================================
import React, { useState, useCallback } from 'react';
import { MicrobiomeData, MicrobiomeAnalysis, DietPlan as DietPlanType, FoodLog } from './types';
import { analyzeMicrobiome } from './engine/microbiomeAnalysis';
import { generateDietPlan } from './engine/dietEngine';
import Layout from './components/Layout';
import MicrobiomeInput from './components/MicrobiomeInput';
import Dashboard from './components/Dashboard';
import DietPlanView from './components/DietPlan';
import FoodLogger from './components/FoodLogger';

type TabId = 'input' | 'dashboard' | 'diet' | 'tracking';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('input');
  const [microbiomeData, setMicrobiomeData] = useState<MicrobiomeData | null>(null);
  const [analysis, setAnalysis] = useState<MicrobiomeAnalysis | null>(null);
  const [dietPlan, setDietPlan] = useState<DietPlanType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDataSubmit = useCallback(async (data: MicrobiomeData) => {
    setIsProcessing(true);

    // 模拟处理延迟（分析 + 生成方案）
    await new Promise(r => setTimeout(r, 1200));

    const result = analyzeMicrobiome(data);
    const plan = generateDietPlan(data);

    setMicrobiomeData(data);
    setAnalysis(result);
    setDietPlan(plan);
    setIsProcessing(false);

    // 自动跳转到仪表盘
    setActiveTab('dashboard');
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as TabId);
  }, []);

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      {/* 加载状态 */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/80 backdrop-blur-sm">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
            <p className="text-lg font-semibold gradient-text">AI 正在分析您的微生物组数据...</p>
            <p className="text-sm text-gray-500 mt-2">分析菌群组成 · 评估健康指标 · 生成饮食方案</p>
          </div>
        </div>
      )}

      {/* 内容区 */}
      {activeTab === 'input' && (
        <MicrobiomeInput onDataSubmit={handleDataSubmit} />
      )}

      {activeTab === 'dashboard' && microbiomeData && analysis && (
        <Dashboard microbiomeData={microbiomeData} analysis={analysis} />
      )}

      {activeTab === 'diet' && dietPlan && (
        <DietPlanView plan={dietPlan} />
      )}

      {activeTab === 'tracking' && (
        <FoodLogger />
      )}

      {/* 未加载数据时的提示 */}
      {activeTab !== 'input' && !microbiomeData && (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🧬</span>
          <h2 className="text-2xl font-bold gradient-text mb-3">请先输入微生物组数据</h2>
          <p className="text-gray-500 mb-6">前往「微生物组」页面输入或生成数据</p>
          <button onClick={() => setActiveTab('input')} className="btn-primary">
            前往输入数据
          </button>
        </div>
      )}
    </Layout>
  );
}
