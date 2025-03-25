export default defineAppConfig({
  pages: ["pages/home/index", "pages/task/index", "pages/mine/index"],
  tabBar: {
    list: [
      {
        pagePath: "pages/home/index",
        text: "",
        iconPath: "assets/icon_menu.png",
        selectedIconPath: "assets/icon_menu--checked.png",
      },
      {
        pagePath: "pages/task/index",
        text: "",
        iconPath: "assets/icon_menu.png",
        selectedIconPath: "assets/icon_menu--checked.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "",
        iconPath: "assets/icon_menu.png",
        selectedIconPath: "assets/icon_menu--checked.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
