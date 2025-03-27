import { useLoad } from "@tarojs/taro";
import MainPageLayout from "@/layout/main-page-layout";

import { MainPageList } from "./data";

import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return <MainPageLayout mainPageList={MainPageList} />;
}
