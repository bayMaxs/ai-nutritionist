// ============================================
// Express 服务器入口
// ============================================
import express from 'express';
import cors from 'cors';
import { microbiomeRouter } from './routes/microbiome';
import { dietRouter } from './routes/diet';
import { trackingRouter } from './routes/tracking';

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/microbiome', microbiomeRouter);
app.use('/api/diet', dietRouter);
app.use('/api/tracking', trackingRouter);

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'AI 营养师 API',
    timestamp: new Date().toISOString(),
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n🧬 AI 营养师 API 服务器已启动`);
  console.log(`📡 地址: http://localhost:${PORT}`);
  console.log(`🔗 健康检查: http://localhost:${PORT}/api/health\n`);
});

export default app;
