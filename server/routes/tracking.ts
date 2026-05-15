// ============================================
// 饮食追踪 API 路由
// ============================================
import { Router, Request, Response } from 'express';

export const trackingRouter = Router();

// 内存存储（演示用）
let foodLogs: any[] = [];

// 获取所有记录
trackingRouter.get('/logs', (_req: Request, res: Response) => {
  res.json({ success: true, data: foodLogs });
});

// 获取今日记录
trackingRouter.get('/logs/today', (_req: Request, res: Response) => {
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = foodLogs.filter(l => l.date === today);
  res.json({ success: true, data: todayLogs });
});

// 添加记录
trackingRouter.post('/logs', (req: Request, res: Response) => {
  try {
    const log = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      ...req.body,
      timestamp: new Date().toISOString(),
    };
    foodLogs.push(log);
    res.json({ success: true, data: log });
  } catch (error) {
    res.status(500).json({ success: false, error: '添加记录失败' });
  }
});

// 删除记录
trackingRouter.delete('/logs/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const before = foodLogs.length;
  foodLogs = foodLogs.filter(l => l.id !== id);
  if (foodLogs.length < before) {
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: '记录不存在' });
  }
});
