import { ENUM_ROUTE_PATH } from '@/constants/route';
import Taro from '@tarojs/taro';

// 使用 Taro 的 API 跳转路由
export function gotoPage(path: ENUM_ROUTE_PATH, query: Record<string, any> = {}) {
  const queryString = Object.keys(query)
    .map((key) => {
      return `${key}=${query[key]}`;
    })
    .join('&');

  const url = queryString ? `${path}?${queryString}` : path;
  Taro.navigateTo({ url });
}
