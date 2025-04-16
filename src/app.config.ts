export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/child-page/index',
    'pages/publish-task/index',
    'pages/test/index',
    'pages/task-center/index',
    'pages/published-task-list/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },

  requiredPrivateInfos: ['chooseLocation', 'chooseAddress', 'getLocation'],
});
