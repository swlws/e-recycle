import { CACHE_KEY } from "./constant";
import { setStorageSync, getStorageSync } from "./storage";

/**
 * 任务信息缓存
 */
export default class CacheTask {
  get data() {
    return getStorageSync(CACHE_KEY.LAST_TASK_ADDRESS_INFO);
  }

  set data(value) {
    setStorageSync(CACHE_KEY.LAST_TASK_ADDRESS_INFO, value);
  }
}
