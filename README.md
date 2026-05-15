# 🧬 AI 营养师

> 基于肠道微生物组数据的个性化智能饮食方案生成系统

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=flat&logo=express" />
</p>

## 📖 项目介绍

AI 营养师是一款创新的健康管理应用，它能够根据用户的肠道微生物组检测数据，利用 AI 算法生成高度个性化的 7 天饮食方案。

传统营养学只关注宏量/微量营养素，而本项目深入到**肠道菌群层面**，根据有益菌、有害菌的丰度比例，菌群多样性指数，短链脂肪酸产生菌水平等维度，精准推荐最适合您肠道的食物组合。

### 🎯 核心理念

> "You are what you eat, but more importantly, you are what your microbes eat."
> 
> 你吃什么很重要，但更重要的是——你的微生物吃了什么。

## ✨ 功能特性

### 🧬 微生物组分析
- **Shannon 多样性指数**计算 — 评估菌群丰富度与均匀度
- **Simpson 多样性指数**计算 — 衡量物种集中度
- **Firmicutes/Bacteroidetes 比率**评估 — 关联代谢健康
- **有益菌 vs 有害菌**比例分析
- **短链脂肪酸（SCFA）产生菌**水平评估
- **综合健康评分**（0-100 分）— 多维度加权计算

### 🍽️ 智能饮食推荐
- 基于菌群数据的 **7 天饮食计划** 自动生成
- 早餐 / 午餐 / 晚餐 / 零食 全覆盖
- **30+ 食谱数据库**，涵盖中式、日式、西式
- **27 种食物**的详细营养成分和微生物组影响分析
- 个性化推荐权重算法（益生元、益生菌、抗炎、高纤维）

### 📊 可视化仪表盘
- **雷达图**：微生物组 5 大维度评分
- **柱状图**：每日营养达标率
- **环形图**：宏量营养素比例
- **进度条**：关键指标实时追踪
- **菌群丰度排行**：Top 10 菌群可视化

### 📝 饮食追踪
- 每日饮食记录与营养计算
- 实时营养达标率反馈
- 饮食遵循度评分
- 食物搜索与快速添加

### 💡 AI 个性化建议
- 基于分析结果的智能建议生成
- 饮食 / 生活方式 / 补充剂分类
- 优先级排序（高 / 中 / 低）
- 关联微生物标注

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────┐
│                  前端 (React)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ 微生物组  │ │  仪表盘   │ │   饮食方案    │ │
│  │  输入组件  │ │  组件     │ │    组件       │ │
│  └──────────┘ └──────────┘ └──────────────┘ │
│  ┌──────────┐ ┌──────────────────────────┐  │
│  │ 饮食追踪  │ │     Recharts 图表库      │  │
│  │  组件     │ │  雷达/柱状/饼/折线图     │  │
│  └──────────┘ └──────────────────────────┘  │
├─────────────────────────────────────────────┤
│              推荐引擎 (TypeScript)           │
│  ┌──────────────┐ ┌─────────────────────┐   │
│  │ 微生物组分析  │ │   饮食推荐引擎      │   │
│  │ · Shannon     │ │ · 食谱评分算法      │   │
│  │ · F/B Ratio   │ │ · 营养目标调整      │   │
│  │ · SCFA 评估   │ │ · 7天计划生成       │   │
│  └──────────────┘ └─────────────────────┘   │
├─────────────────────────────────────────────┤
│              后端 API (Express)              │
│  /api/microbiome  /api/diet  /api/tracking  │
└─────────────────────────────────────────────┘
```

### 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | React 18 + TypeScript | 类型安全的组件化开发 |
| 构建工具 | Vite 5 | 极速 HMR，毫秒级热更新 |
| 样式方案 | TailwindCSS 3 | 原子化 CSS，快速构建 UI |
| 图表库 | Recharts | 声明式 React 图表组件 |
| 后端 | Express + TypeScript | 轻量 REST API 服务 |
| 推荐引擎 | 自研规则引擎 | 基于权重的个性化推荐算法 |

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/your-username/ai-nutritionist.git
cd ai-nutritionist

# 2. 安装依赖
npm install

# 3. 启动开发服务器（前端 + 后端同时启动）
npm run start
```

启动后：
- 🌐 前端：http://localhost:5173
- 📡 API：http://localhost:3001

### 单独启动

```bash
# 仅前端
npm run dev

# 仅后端
npm run server

# 构建生产版本
npm run build
```

## 📸 功能截图（文字描述）

### 1. 微生物组数据输入
- 科技感十足的欢迎界面，带有 DNA 双螺旋动画
- 三个快速体验按钮：随机生成 / 健康样本 / 亚健康样本
- 科普卡片介绍肠道微生物组基础知识

### 2. 分析仪表盘
- 四宫格概览：综合评分、菌群多样性、有益菌占比、有害菌占比
- 环形健康评分（0-100），带有渐变动画
- 菌群丰度 Top 10 横向柱状图，颜色区分有益/有害/中性
- 5 维雷达图展示各维度评分
- AI 个性化建议面板，按优先级排列

### 3. 7 天饮食方案
- 日期选择器，支持切换每天的饮食计划
- 每餐卡片展示：食谱名称、食材标签、营养成分、详细做法
- 每日营养总计与进度条
- 智能建议面板

### 4. 饮食追踪
- 今日营养五维进度展示
- 饮食遵循度评分（带状态表情）
- 食物搜索与快速添加
- 按餐型分类的记录列表

## 🌟 项目亮点

### 1. 真实的微生物组科学
不是简单模拟——Shannon 指数、F/B 比率、SCFA 评估都是真实的肠道健康评估指标。推荐算法基于「什么菌吃什么食物」的科学逻辑。

### 2. 多维度智能推荐
推荐引擎综合考虑 5 个维度（多样性、有益菌、有害菌、F/B 平衡、SCFA），加权评分生成最优饮食方案。

### 3. 丰富的食物数据库
27 种食物，每种都标注了：
- 详细宏量/微量营养素
- 对肠道菌群的具体影响
- 健康益处标签

### 4. 科技感 UI 设计
- 深色主题 + 渐变色彩
- 玻璃拟态（Glass Morphism）卡片
- 流畅的过渡动画
- 响应式设计（桌面 + 移动端）

### 5. 全栈 TypeScript
前后端共享类型定义，从数据模型到 API 响应全程类型安全。

### 6. 零外部 AI 依赖
推荐算法完全自研，不依赖任何外部 AI API，离线可用，隐私安全。

## 📁 项目结构

```
ai-nutritionist/
├── README.md                    # 项目说明
├── package.json                 # 依赖配置
├── tsconfig.json                # TypeScript 配置
├── vite.config.ts               # Vite 构建配置
├── tailwind.config.js           # TailwindCSS 配置
├── index.html                   # HTML 入口
├── src/
│   ├── main.tsx                 # React 入口
│   ├── App.tsx                  # 主组件（状态管理 + 路由）
│   ├── index.css                # 全局样式 + Tailwind 扩展
│   ├── components/
│   │   ├── Layout.tsx           # 整体布局（导航 + 响应式）
│   │   ├── MicrobiomeInput.tsx  # 数据输入界面
│   │   ├── Dashboard.tsx        # 分析仪表盘
│   │   ├── DietPlan.tsx         # 饮食方案展示
│   │   ├── NutritionChart.tsx   # 营养图表（雷达/柱状/饼图）
│   │   ├── FoodLogger.tsx       # 饮食追踪记录
│   │   ├── HealthScore.tsx      # 健康评分环形图
│   │   └── RecommendationPanel.tsx # AI 建议面板
│   ├── data/
│   │   ├── microbiome.ts        # 模拟微生物组数据
│   │   ├── foods.ts             # 27 种食物数据库
│   │   └── recipes.ts           # 20 种食谱数据库
│   ├── engine/
│   │   ├── dietEngine.ts        # 饮食推荐引擎核心
│   │   ├── microbiomeAnalysis.ts # 微生物组分析算法
│   │   └── nutritionCalc.ts     # 营养计算工具
│   ├── types/
│   │   └── index.ts             # TypeScript 类型定义
│   └── utils/
│       └── helpers.ts           # 工具函数
└── server/
    ├── index.ts                 # Express 服务器入口
    ├── routes/
    │   ├── microbiome.ts        # 微生物组 API
    │   ├── diet.ts              # 饮食方案 API
    │   └── tracking.ts          # 饮食追踪 API
    └── engine/
        └── recommendationEngine.ts # 服务端引擎导出
```

## 📄 License

MIT License

---

<p align="center">
  🧬 AI 营养师 — 让每一餐都为你的肠道菌群而定制
</p>
