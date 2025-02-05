import CacheTask from "./task";
import CacheUser from "./user";

/**
 * 缓存中心
 */
class CacheCenter {
  user!: CacheUser;
  task!: CacheTask;
  constructor() {
    this.user = new CacheUser();
    this.task = new CacheTask();
  }
}

export default new CacheCenter();
