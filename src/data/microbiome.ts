// ============================================
// 微生物组模拟数据
// ============================================
import { MicrobiomeData, MicrobeAbundance } from '../types';

/** 常见肠道菌群列表 */
export const MICROBE_CATALOG: MicrobeAbundance[] = [
  // 有益菌
  { name: 'Lactobacillus', displayName: '乳杆菌', abundance: 8.5, category: 'beneficial', phylum: 'Firmicutes' },
  { name: 'Bifidobacterium', displayName: '双歧杆菌', abundance: 12.3, category: 'beneficial', phylum: 'Actinobacteria' },
  { name: 'Akkermansia', displayName: '嗜黏蛋白阿克曼菌', abundance: 3.2, category: 'beneficial', phylum: 'Verrucomicrobia' },
  { name: 'Faecalibacterium', displayName: '粪杆菌', abundance: 9.8, category: 'beneficial', phylum: 'Firmicutes' },
  { name: 'Roseburia', displayName: '罗斯氏菌', abundance: 5.1, category: 'beneficial', phylum: 'Firmicutes' },
  { name: 'Eubacterium', displayName: '真杆菌', abundance: 4.2, category: 'beneficial', phylum: 'Firmicutes' },
  { name: 'Prevotella', displayName: '普雷沃菌', abundance: 7.5, category: 'neutral', phylum: 'Bacteroidetes' },
  { name: 'Bacteroides', displayName: '拟杆菌', abundance: 18.6, category: 'neutral', phylum: 'Bacteroidetes' },
  // 有害菌
  { name: 'Clostridium', displayName: '梭菌', abundance: 3.8, category: 'harmful', phylum: 'Firmicutes' },
  { name: 'Escherichia', displayName: '大肠杆菌', abundance: 2.1, category: 'harmful', phylum: 'Proteobacteria' },
  { name: 'Staphylococcus', displayName: '葡萄球菌', abundance: 0.8, category: 'harmful', phylum: 'Firmicutes' },
  { name: 'Helicobacter', displayName: '幽门螺杆菌', abundance: 0.3, category: 'harmful', phylum: 'Proteobacteria' },
  { name: 'Salmonella', displayName: '沙门氏菌', abundance: 0.1, category: 'harmful', phylum: 'Proteobacteria' },
  // 其他菌
  { name: 'Firmicutes_unclassified', displayName: '厚壁菌门(其他)', abundance: 12.5, category: 'neutral', phylum: 'Firmicutes' },
  { name: 'Bacteroidetes_unclassified', displayName: '拟杆菌门(其他)', abundance: 6.2, category: 'neutral', phylum: 'Bacteroidetes' },
  { name: 'Actinobacteria_unclassified', displayName: '放线菌门(其他)', abundance: 2.8, category: 'neutral', phylum: 'Actinobacteria' },
  { name: 'Proteobacteria_unclassified', displayName: '变形菌门(其他)', abundance: 1.5, category: 'neutral', phylum: 'Proteobacteria' },
  { name: 'Verrucomicrobia_unclassified', displayName: '疣微菌门(其他)', abundance: 0.7, category: 'neutral', phylum: 'Verrucomicrobia' },
];

/** 生成随机微生物组数据 */
export function generateMicrobiomeData(): MicrobiomeData {
  const microbes = MICROBE_CATALOG.map(m => ({
    ...m,
    abundance: Math.max(0.01, m.abundance + (Math.random() - 0.5) * m.abundance * 0.6),
  }));

  // 归一化使总和为 100
  const total = microbes.reduce((sum, m) => sum + m.abundance, 0);
  microbes.forEach(m => {
    m.abundance = parseFloat((m.abundance / total * 100).toFixed(2));
  });

  return {
    id: 'sample-' + Date.now(),
    sampleDate: new Date().toISOString().split('T')[0],
    microbes,
    metadata: {
      age: 30,
      gender: 'male',
      diet: 'mixed',
      antibiotics: false,
    },
  };
}

/** 预设的健康微生物组样本 */
export const HEALTHY_SAMPLE: MicrobiomeData = {
  id: 'healthy-sample',
  sampleDate: '2024-01-15',
  microbes: [
    { name: 'Lactobacillus', displayName: '乳杆菌', abundance: 10.2, category: 'beneficial', phylum: 'Firmicutes' },
    { name: 'Bifidobacterium', displayName: '双歧杆菌', abundance: 14.5, category: 'beneficial', phylum: 'Actinobacteria' },
    { name: 'Akkermansia', displayName: '嗜黏蛋白阿克曼菌', abundance: 4.8, category: 'beneficial', phylum: 'Verrucomicrobia' },
    { name: 'Faecalibacterium', displayName: '粪杆菌', abundance: 11.2, category: 'beneficial', phylum: 'Firmicutes' },
    { name: 'Roseburia', displayName: '罗斯氏菌', abundance: 6.3, category: 'beneficial', phylum: 'Firmicutes' },
    { name: 'Eubacterium', displayName: '真杆菌', abundance: 5.1, category: 'beneficial', phylum: 'Firmicutes' },
    { name: 'Prevotella', displayName: '普雷沃菌', abundance: 8.2, category: 'neutral', phylum: 'Bacteroidetes' },
    { name: 'Bacteroides', displayName: '拟杆菌', abundance: 20.1, category: 'neutral', phylum: 'Bacteroidetes' },
    { name: 'Clostridium', displayName: '梭菌', abundance: 1.5, category: 'harmful', phylum: 'Firmicutes' },
    { name: 'Escherichia', displayName: '大肠杆菌', abundance: 0.8, category: 'harmful', phylum: 'Proteobacteria' },
    { name: 'Staphylococcus', displayName: '葡萄球菌', abundance: 0.3, category: 'harmful', phylum: 'Firmicutes' },
    { name: 'Helicobacter', displayName: '幽门螺杆菌', abundance: 0.1, category: 'harmful', phylum: 'Proteobacteria' },
    { name: 'Salmonella', displayName: '沙门氏菌', abundance: 0.05, category: 'harmful', phylum: 'Proteobacteria' },
    { name: 'Firmicutes_unclassified', displayName: '厚壁菌门(其他)', abundance: 10.8, category: 'neutral', phylum: 'Firmicutes' },
    { name: 'Bacteroidetes_unclassified', displayName: '拟杆菌门(其他)', abundance: 4.5, category: 'neutral', phylum: 'Bacteroidetes' },
    { name: 'Actinobacteria_unclassified', displayName: '放线菌门(其他)', abundance: 1.2, category: 'neutral', phylum: 'Actinobacteria' },
    { name: 'Proteobacteria_unclassified', displayName: '变形菌门(其他)', abundance: 0.2, category: 'neutral', phylum: 'Proteobacteria' },
    { name: 'Verrucomicrobia_unclassified', displayName: '疣微菌门(其他)', abundance: 0.1, category: 'neutral', phylum: 'Verrucomicrobia' },
  ],
};

/** 预设的不健康微生物组样本 */
export const UNHEALTHY_SAMPLE: MicrobiomeData = {
  id: 'unhealthy-sample',
  sampleDate: '2024-01-15',
  microbes: [
    { name: 'Lactobacillus', displayName: '乳杆菌', abundance: 3.1, category: 'beneficial', phylum: 'Firmicutes' },
    { name: 'Bifidobacterium', displayName: '双歧杆菌', abundance: 4.2, category: 'beneficial', phylum: 'Actinobacteria' },
    { name: 'Akkermansia', displayName: '嗜黏蛋白阿克曼菌', abundance: 0.8, category: 'beneficial', phylum: 'Verrucomicrobia' },
    { name: 'Faecalibacterium', displayName: '粪杆菌', abundance: 3.5, category: 'beneficial', phylum: 'Firmicutes' },
    { name: 'Roseburia', displayName: '罗斯氏菌', abundance: 1.8, category: 'beneficial', phylum: 'Firmicutes' },
    { name: 'Eubacterium', displayName: '真杆菌', abundance: 1.5, category: 'beneficial', phylum: 'Firmicutes' },
    { name: 'Prevotella', displayName: '普雷沃菌', abundance: 5.2, category: 'neutral', phylum: 'Bacteroidetes' },
    { name: 'Bacteroides', displayName: '拟杆菌', abundance: 22.5, category: 'neutral', phylum: 'Bacteroidetes' },
    { name: 'Clostridium', displayName: '梭菌', abundance: 12.8, category: 'harmful', phylum: 'Firmicutes' },
    { name: 'Escherichia', displayName: '大肠杆菌', abundance: 8.5, category: 'harmful', phylum: 'Proteobacteria' },
    { name: 'Staphylococcus', displayName: '葡萄球菌', abundance: 4.2, category: 'harmful', phylum: 'Firmicutes' },
    { name: 'Helicobacter', displayName: '幽门螺杆菌', abundance: 2.1, category: 'harmful', phylum: 'Proteobacteria' },
    { name: 'Salmonella', displayName: '沙门氏菌', abundance: 0.8, category: 'harmful', phylum: 'Proteobacteria' },
    { name: 'Firmicutes_unclassified', displayName: '厚壁菌门(其他)', abundance: 18.5, category: 'neutral', phylum: 'Firmicutes' },
    { name: 'Bacteroidetes_unclassified', displayName: '拟杆菌门(其他)', abundance: 5.2, category: 'neutral', phylum: 'Bacteroidetes' },
    { name: 'Actinobacteria_unclassified', displayName: '放线菌门(其他)', abundance: 2.8, category: 'neutral', phylum: 'Actinobacteria' },
    { name: 'Proteobacteria_unclassified', displayName: '变形菌门(其他)', abundance: 3.2, category: 'neutral', phylum: 'Proteobacteria' },
    { name: 'Verrucomicrobia_unclassified', displayName: '疣微菌门(其他)', abundance: 0.3, category: 'neutral', phylum: 'Verrucomicrobia' },
  ],
};
