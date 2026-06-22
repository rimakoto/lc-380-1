import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  { id: 'd00', name: '可口可乐', price: 3.5, type: 'drink', color: '#E53935', labelColor: '#FFFFFF', row: 0, col: 0 },
  { id: 'd01', name: '百事可乐', price: 3.0, type: 'drink', color: '#1565C0', labelColor: '#FFFFFF', row: 0, col: 1 },
  { id: 'd02', name: '雪碧', price: 3.0, type: 'drink', color: '#43A047', labelColor: '#FFFFFF', row: 0, col: 2 },
  { id: 'd03', name: '芬达橙', price: 3.0, type: 'drink', color: '#FB8C00', labelColor: '#FFFFFF', row: 0, col: 3 },
  { id: 'd10', name: '农夫山泉', price: 2.0, type: 'drink', color: '#00897B', labelColor: '#FFFFFF', row: 1, col: 0 },
  { id: 'd11', name: '红牛', price: 6.0, type: 'drink', color: '#FFD600', labelColor: '#000000', row: 1, col: 1 },
  { id: 'd12', name: '王老吉', price: 4.0, type: 'drink', color: '#B71C1C', labelColor: '#FFD700', row: 1, col: 2 },
  { id: 'd13', name: '加多宝', price: 4.0, type: 'drink', color: '#C62828', labelColor: '#FFD700', row: 1, col: 3 },
  { id: 'd20', name: '元气森林', price: 5.0, type: 'drink', color: '#8D6E63', labelColor: '#FFFFFF', row: 2, col: 0 },
  { id: 'd21', name: '东方树叶', price: 5.5, type: 'drink', color: '#2E7D32', labelColor: '#FFF8E1', row: 2, col: 1 },
  { id: 'd22', name: '三得利乌龙', price: 5.0, type: 'drink', color: '#5D4037', labelColor: '#FFECB3', row: 2, col: 2 },
  { id: 'd23', name: '雀巢咖啡', price: 5.0, type: 'drink', color: '#6D4C41', labelColor: '#FFFFFF', row: 2, col: 3 },
  { id: 's30', name: '乐事薯片', price: 8.0, type: 'snack', color: '#FFCA28', labelColor: '#BF360C', row: 3, col: 0 },
  { id: 's31', name: '奥利奥', price: 9.9, type: 'snack', color: '#263238', labelColor: '#FFFFFF', row: 3, col: 1 },
  { id: 's32', name: '旺旺雪饼', price: 6.0, type: 'snack', color: '#FFF9C4', labelColor: '#E65100', row: 3, col: 2 },
  { id: 's33', name: '好丽友派', price: 7.0, type: 'snack', color: '#795548', labelColor: '#FFFFFF', row: 3, col: 3 },
  { id: 's40', name: '德芙巧克力', price: 12.0, type: 'snack', color: '#4E342E', labelColor: '#D4A574', row: 4, col: 0 },
  { id: 's41', name: '士力架', price: 6.0, type: 'snack', color: '#3E2723', labelColor: '#FFAB40', row: 4, col: 1 },
  { id: 's42', name: '恰恰瓜子', price: 5.0, type: 'snack', color: '#D84315', labelColor: '#FFF176', row: 4, col: 2 },
  { id: 's43', name: '康师傅饼干', price: 5.5, type: 'snack', color: '#A1887F', labelColor: '#FFFFFF', row: 4, col: 3 },
];

export const MACHINE_CONFIG = {
  width: 4.5,
  height: 7.5,
  depth: 2.5,
  glassThickness: 0.05,
  frameThickness: 0.2,
  rows: 5,
  cols: 4,
  rowSpacing: 1.1,
  colSpacing: 0.95,
  dispenserHeight: 1.2,
};
