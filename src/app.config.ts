export default defineAppConfig({
  pages: ["pages/buy/index", "pages/sell/index", "pages/mine/index"],
  tabBar: {
    color: "#666",
    selectedColor: "#000",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/sell/index",
        text: "",
        iconPath: "assets/sell.png",
        selectedIconPath: "assets/sell-checked.png",
      },
      {
        pagePath: "pages/buy/index",
        text: "",
        iconPath: "assets/bug.png",
        selectedIconPath: "assets/bug-checked.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我",
        iconPath: "assets/mine.png",
        selectedIconPath: "assets/mine-checked.png",
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
