import { getItem, setItem } from '@/bridge/storage';
import { CacheUserInfo } from '@/typings/user';

const STORAGE_KEY = 'user_info';

export default class {
  get value(): CacheUserInfo {
    return getItem(STORAGE_KEY) || {};
  }

  setValue(info: CacheUserInfo) {
    const oldInfo = this.value;
    setItem(STORAGE_KEY, { ...oldInfo, ...info });
  }

  clear() {
    this.setValue({} as CacheUserInfo);
  }
}
