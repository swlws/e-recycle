export default {
  // 用户积分
  queryUserScore: {
    url: '/api/user/score',
    method: 'GET',
  },
  // 积分列表
  queryUserScoreList: {
    url: '/api/user/score_list',
    method: 'POST',
  },
};
