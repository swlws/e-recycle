export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/child-page/index',
    'pages/publish-task/index',
    'pages/test/index',
    'pages/task-center/index',
    'pages/published-task-list/index',
    'pages/sell-out-list/index',
    'pages/buy-in-list/index',
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
