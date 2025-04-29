/**
 * 路由路径
 */
export enum ENUM_ROUTE_PATH {
  /** 发布单个任务 */
  PUBLISH_TASK = '/packageA/pages/publish-task/index',
  /** 任务详情 */
  TASK_DETAIL = '/packageA/pages/task-detail/index',
  /** 发布的 */
  PUBLISHED_LIST = '/packageB/pages/published-task-list/index',
  /** 交易中的 */
  IN_TRADING_LIST = '/packageB/pages/in-trading-list/index',
  /** 卖出的 */
  SELL_OUT_LIST = '/packageB/pages/sell-out-list/index',
  /** 买进的 */
  BUY_IN_LIST = '/packageB/pages/buy-in-list/index',
  /** 分享个人二维码 */
  USER_QR_CODE = '/packageC/pages/user-qr-code/index',
  /** 用户积分 */
  USER_SCORE = '/packageC/pages/user-score/index',
}

/** 页面别名 */
export enum ENUM_PAGE_ALIAS {
  TASK_CENTER = 'TASK_CENTER',
  PUBLISHED_LIST = 'PUBLISHED_LIST',
  IN_TRADING_LIST = 'IN_TRADING_LIST',
  SELL_OUT_LIST = 'SELL_OUT_LIST',
  BUY_IN_LIST = 'BUY_IN_LIST',
}
