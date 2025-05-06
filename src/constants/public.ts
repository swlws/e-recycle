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
  // 过期
  INVALID = 'INVALID',
}

/**
 * 任务状态中文映射
 */
export const TASK_STATE_MAP_ZH_CN = {
  [ENUM_TASK_STATE.PENDDING]: '待接单',
  [ENUM_TASK_STATE.WILL_RESOLVE]: '交易中',
  [ENUM_TASK_STATE.RESOLVE]: '已完成',
  [ENUM_TASK_STATE.INVALID]: '已过期',
};

/** 积分来源类型 */
export enum ENUM_SCORE_SOURCE_TYPE {
  /** 邀请 */
  INVITE = 'invite',
}

/** 积分来源中文名映射 */
export const SCORE_SOURCE_CHINESE_NAME_MAP = {
  [ENUM_SCORE_SOURCE_TYPE.INVITE]: '邀请',
};
