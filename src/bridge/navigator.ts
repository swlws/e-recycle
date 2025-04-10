import { ENUM_ROUTE_PATH } from '@/constants/route';
import Taro from '@tarojs/taro';

// 使用 Taro 的 API 跳转路由
export function gotoPage(path: ENUM_ROUTE_PATH) {
  Taro.navigateTo({ url: path });
}
