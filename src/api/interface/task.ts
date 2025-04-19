export default {
  /** 新建任务 */
  createTask: {
    url: '/api/task/create',
    method: 'POST',
    header: {},
  },
  /** 查询所有任务 */
  queryAllTask: {
    url: '/api/task/all',
    method: 'POST',
    header: {},
  },
  /** 查询自己发布过的任务 */
  queryUserPublishedTask: {
    url: '/api/task/user/published',
    method: 'POST',
    header: {},
  },
  /** 查询自己卖出的任务 */
  queryUserSelloutTask: {
    url: '/api/task/user/sellout',
    method: 'POST',
    header: {},
  },
  /** 查询自己买入的任务 */
  queryUserBuyinTask: {
    url: '/api/task/user/buyin',
    method: 'POST',
    header: {},
  },
  /** 用户的任务统计 */
  queryUserTaskCount: {
    url: '/api/task/user/count',
    method: 'GET',
    header: {},
  },
  /** 用户的任务统计 */
  // 参数。_id 任务ID
  removeTask: {
    url: '/api/task/remove',
    method: 'POST',
    header: {},
  },
  /** 完成任务 */
  // 参数。_id 任务ID
  finishTask: {
    url: '/api/task/finish',
    method: 'POST',
    header: {},
  },
  /** 任务任务 */
  // 参数。_id 任务ID
  taskTask: {
    url: '/api/task/finish',
    method: 'POST',
    header: {},
  },
};
