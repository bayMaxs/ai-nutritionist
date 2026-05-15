// ============================================
// 饮食方案 API 路由
// ============================================
import { Router, Request, Response } from 'express';
import { generateDietPlan } from '../../src/engine/dietEngine';

export const dietRouter = Router();

// 生成饮食方案
dietRouter.post('/generate', (req: Request, res: Response) => {
  try {
    const microbiomeData = req.body;
    if (!microbiomeData?.microbes || !Array.isArray(microbiomeData.microbes)) {
      return res.status(400).json({ success: false, error: '无效的微生物组数据格式' });
    }
    const plan = generateDietPlan(microbiomeData);
    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, error: '生成方案失败: ' + (error as Error).message });
  }
});
