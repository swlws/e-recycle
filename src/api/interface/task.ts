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
  querySelfPublishedTask: {
    url: '/api/task/self/published',
    method: 'POST',
    header: {},
  },
  /** 查询自己卖出的任务 */
  querySelfSelloutTask: {
    url: '/api/task/self/sellout',
    method: 'POST',
    header: {},
  },
  /** 查询自己买入的任务 */
  querySelfBuyinTask: {
    url: '/api/task/self/buyin',
    method: 'POST',
    header: {},
  },
};
