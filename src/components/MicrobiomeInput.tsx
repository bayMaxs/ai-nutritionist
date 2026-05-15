// ============================================
// 微生物组数据输入组件
// ============================================
import React, { useState } from 'react';
import { MicrobiomeData } from '../types';
import { generateMicrobiomeData, HEALTHY_SAMPLE, UNHEALTHY_SAMPLE } from '../data/microbiome';

interface MicrobiomeInputProps {
  onDataSubmit: (data: MicrobiomeData) => void;
}

export default function MicrobiomeInput({ onDataSubmit }: MicrobiomeInputProps) {
  const [customData, setCustomData] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRandom = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 800)); // 模拟生成延迟
    const data = generateMicrobiomeData();
    onDataSubmit(data);
    setIsGenerating(false);
  };

  const handlePreset = (type: 'healthy' | 'unhealthy') => {
    const data = type === 'healthy' ? { ...HEALTHY_SAMPLE } : { ...UNHEALTHY_SAMPLE };
    data.id = 'preset-' + Date.now();
    data.sampleDate = new Date().toISOString().split('T')[0];
    onDataSubmit(data);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 标题区 */}
      <div className="text-center py-8">
        <div className="text-6xl mb-4 animate-float">🧬</div>
        <h2 className="text-3xl font-bold gradient-text mb-3">肠道微生物组分析</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          输入您的肠道微生物组检测数据，AI 将为您生成个性化的饮食方案。
          支持手动输入或使用预设样本快速体验。
        </p>
      </div>

      {/* 快速体验 */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">🚀 快速体验</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleGenerateRandom}
            disabled={isGenerating}
            className="btn-primary flex items-center justify-center gap-2 py-4"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                生成中...
              </>
            ) : (
              <>🎲 随机生成数据</>
            )}
          </button>
          <button
            onClick={() => handlePreset('healthy')}
            className="btn-ghost py-4 border-accent-500/30 hover:bg-accent-500/10"
          >
            ✅ 健康样本
          </button>
          <button
            onClick={() => handlePreset('unhealthy')}
            className="btn-ghost py-4 border-red-500/30 hover:bg-red-500/10"
          >
            ⚠️ 亚健康样本
          </button>
        </div>
      </div>

      {/* 预设说明 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5 border-accent-500/20">
          <h4 className="text-accent-400 font-medium mb-2">✅ 健康样本特征</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• 有益菌丰度高（乳杆菌 10%+，双歧杆菌 14%+）</li>
            <li>• 有害菌水平低（梭菌 {'<'}2%，大肠杆菌 {'<'}1%）</li>
            <li>• Shannon 指数 {'>'} 3.5，多样性优秀</li>
            <li>• F/B 比率接近 1.25，菌群平衡</li>
          </ul>
        </div>
        <div className="glass-card p-5 border-red-500/20">
          <h4 className="text-red-400 font-medium mb-2">⚠️ 亚健康样本特征</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• 有益菌丰度低（乳杆菌 3%，双歧杆菌 4%）</li>
            <li>• 有害菌偏高（梭菌 12%+，大肠杆菌 8%+）</li>
            <li>• Shannon 指数偏低，多样性不足</li>
            <li>• F/B 比率失衡，可能与饮食不当有关</li>
          </ul>
        </div>
      </div>

      {/* 关于微生物组 */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">🔬 什么是肠道微生物组？</h3>
        <div className="text-sm text-gray-400 space-y-3">
          <p>
            肠道微生物组是指生活在人体肠道中的数万亿微生物的集合，
            包括细菌、真菌、病毒等。它们在消化、免疫、代谢等方面发挥着关键作用。
          </p>
          <p>
            通过 16S rRNA 基因测序或宏基因组测序，可以了解肠道菌群的组成和丰度，
            从而评估肠道健康状况并制定个性化饮食方案。
          </p>
          <p className="text-accent-400/80">
            💡 目前您可以通过华大基因、诺禾致源等机构进行肠道微生物组检测
          </p>
        </div>
      </div>
    </div>
  );
}
