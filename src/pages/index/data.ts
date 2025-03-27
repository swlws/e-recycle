import HomePage from "@/pages/home";
import MinePage from "@/pages/mine";
import { IMainPage } from "@/typings";

export const MainPageList: IMainPage[] = [
  {
    name: "home",
    nameZh: "首页",
    component: HomePage,
  },
  {
    name: "mine",
    nameZh: "我的",
    component: MinePage,
  },
];
