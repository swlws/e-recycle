import Taro from "@tarojs/taro";

/**
 * 取出临时存储的数据
 * @param key
 * @returns
 */
export function getStorageSync(key: string) {
  return Taro.getStorageSync(key);
}

/**
 * 设置临时存储的数据
 * @param key
 * @param value
 * @returns
 */
export function setStorageSync(key: string, value: any) {
  return Taro.setStorageSync(key, value);
}
