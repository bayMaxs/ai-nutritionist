// ============================================
// 整体布局组件
// ============================================
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'input', label: '微生物组', icon: '🧬' },
  { id: 'dashboard', label: '仪表盘', icon: '📊' },
  { id: 'diet', label: '饮食方案', icon: '🥗' },
  { id: 'tracking', label: '饮食追踪', icon: '📝' },
];

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 glass-card border-0 border-b border-dark-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-xl">
                🧬
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">AI 营养师</h1>
                <p className="text-xs text-gray-500 hidden sm:block">基于肠道微生物组的个性化饮食方案</p>
              </div>
            </div>

            {/* 导航标签 - 桌面端 */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-600/30 to-accent-600/30 text-accent-400 border border-accent-500/30'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-dark-700/50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* 状态指示 */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-slow" />
              <span className="text-xs text-gray-500">AI 就绪</span>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* 移动端底部导航 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-0 border-t border-dark-700/50">
        <div className="flex justify-around py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-accent-400'
                  : 'text-gray-500'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
