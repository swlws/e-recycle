import Taro from '@tarojs/taro';

/**
 * 获取缓存
 * @param key
 */
export function getItem(key: string) {
  return Taro.getStorageSync(key);
}

/**
 * 设置缓存
 * @param key
 * @param value
 */
export function setItem(key: string, value: any) {
  Taro.setStorageSync(key, value);
}
