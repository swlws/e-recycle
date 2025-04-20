export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/child-page/index',
    'pages/publish-task/index',
    'pages/task-detail/index',
    'pages/test/index',
    'pages/published-task-list/index',
    'pages/sell-out-list/index',
    'pages/buy-in-list/index',
    'pages/user-qr-code/index',
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
