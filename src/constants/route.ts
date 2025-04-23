/**
 * 路由路径
 */
export enum ENUM_ROUTE_PATH {
  /** 主页 */
  Home = '/pages/home/index',
  /** 我的 */
  Mine = '/pages/mine/index',
  /** 发布单个任务 */
  PUBLISH_TASK = '/pages/publish-task/index',
  /** 任务详情 */
  TASK_DETAIL = '/pages/task-detail/index',
  /** 任务中心 */
  TASK_CENTER = '/pages/task-center/index',
  /** 发布的 */
  PUBLISHED_LIST = '/pages/published-task-list/index',
  /** 交易中的 */
  IN_TRADING_LIST = '/pages/in-trading-list/index',
  /** 卖出的 */
  SELL_OUT_LIST = '/pages/sell-out-list/index',
  /** 买进的 */
  BUY_IN_LIST = '/pages/buy-in-list/index',
  /** 分享个人二维码 */
  USER_QR_CODE = '/pages/user-qr-code/index',
  /** 测试 */
  Test = '/pages/test/index',
}

/** 页面别名 */
export enum ENUM_PAGE_ALIAS {
  TASK_CENTER = 'TASK_CENTER',
  PUBLISHED_LIST = 'PUBLISHED_LIST',
  IN_TRADING_LIST = 'IN_TRADING_LIST',
  SELL_OUT_LIST = 'SELL_OUT_LIST',
  BUY_IN_LIST = 'BUY_IN_LIST',
}
