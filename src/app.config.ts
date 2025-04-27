export default defineAppConfig({
  // 主页
  pages: ['pages/index/index'],
  // 分包
  subPackages: [
    // 任务发布
    {
      root: 'packageA',
      pages: ['pages/publish-task/index', 'pages/task-detail/index'],
    },
    // 任务列表
    {
      root: 'packageB',
      pages: [
        'pages/published-task-list/index',
        'pages/in-trading-list/index',
        'pages/sell-out-list/index',
        'pages/buy-in-list/index',
      ],
    },
    // 用户中心
    {
      root: 'packageC',
      pages: ['pages/user-qr-code/index'],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
  requiredPrivateInfos: ['chooseLocation', 'chooseAddress', 'getLocation'],
});
