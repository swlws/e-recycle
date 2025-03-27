import { setStorageSync, getStorageSync } from "./storage";

/**
 * 用户信息缓存
 */
export default class CacheUser {
  get data() {
    return getStorageSync("userInfo");
  }

  set data(value) {
    setStorageSync("userInfo", value);
  }

  getUserId() {
    return this.data?.id;
  }
}
