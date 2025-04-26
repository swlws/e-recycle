import ChaiQian from '@/asset/images/chaiqian.png';
import JinShu from '@/asset/images/jinshu.png';
import TuShu from '@/asset/images/tushu.png';
import YiWu from '@/asset/images/yiwu.png';
import JiaDian from '@/asset/images/jiadian.png';
import ZaWu from '@/asset/images/zawu.png';

/** 商品枚举 */
export const ENUM_GOODS_LIST = [
  { image: ChaiQian, text: '建筑拆迁' },
  { image: JinShu, text: '废旧金属' },
  { image: TuShu, text: '纸质物品' },
  { image: JiaDian, text: '日用家电' },
  { image: YiWu, text: '闲置衣物' },
  { image: ZaWu, text: '其它杂物' },
];

/**
 * 商品分类
 */
export const GOODS_LIST = ['杂物', '家具', '家电', '书籍', '建筑材料', '拆迁杂物'];

/**
 * 任务状态
 */
export enum ENUM_TASK_STATE {
  PENDDING = 'PENDDING',
  WILL_RESOLVE = 'WILL_RESOLVE', // 即将执行
  RESOLVE = 'RESOLVE',
}
