// ============================================
// 微生物组 API 路由
// ============================================
import { Router, Request, Response } from 'express';
import { generateMicrobiomeData, HEALTHY_SAMPLE, UNHEALTHY_SAMPLE } from '../../src/data/microbiome';
import { analyzeMicrobiome } from '../../src/engine/microbiomeAnalysis';

export const microbiomeRouter = Router();

// 获取随机微生物组数据
microbiomeRouter.get('/random', (_req: Request, res: Response) => {
  const data = generateMicrobiomeData();
  res.json({ success: true, data });
});

// 获取预设样本
microbiomeRouter.get('/preset/:type', (req: Request, res: Response) => {
  const { type } = req.params;
  const data = type === 'healthy' ? HEALTHY_SAMPLE : UNHEALTHY_SAMPLE;
  res.json({ success: true, data: { ...data, id: 'preset-' + Date.now() } });
});

// 分析微生物组数据
microbiomeRouter.post('/analyze', (req: Request, res: Response) => {
  try {
    const microbiomeData = req.body;
    if (!microbiomeData?.microbes || !Array.isArray(microbiomeData.microbes)) {
      return res.status(400).json({ success: false, error: '无效的微生物组数据格式' });
    }
    const analysis = analyzeMicrobiome(microbiomeData);
    res.json({ success: true, data: analysis });
  } catch (error) {
    res.status(500).json({ success: false, error: '分析失败: ' + (error as Error).message });
  }
});
