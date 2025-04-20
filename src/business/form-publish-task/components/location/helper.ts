import { openBaiduMap, openLocation } from '@/bridge/location';
import { IChooseLocation } from '@/typings/bridge';

// 地图提供商
export enum MAP_PROVIDER {
  TENCENT = 'TENCENT',
  BAIDU = 'BAIDU',
  GAO_DE = 'GAO_DE',
}

// 地图提供商的名称
export const MAP_PROVIDER_LIST = [
  { name: '腾讯地图', value: MAP_PROVIDER.TENCENT },
  // { name: '百度地图', value: MAP_PROVIDER.BAIDU },
  // { name: '高德地图', value: MAP_PROVIDER.GAO_DE },
];

/**
 * 打开地图
 * @param provider
 * @param location
 */
export function openMap(provider: MAP_PROVIDER, location: IChooseLocation) {
  switch (provider) {
    case MAP_PROVIDER.TENCENT: {
      openLocation(location);
      break;
    }
    case MAP_PROVIDER.BAIDU: {
      openBaiduMap(location);
      break;
    }
  }
}
