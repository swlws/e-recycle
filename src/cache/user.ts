import { getItem, setItem } from '@/bridge/storage';
import { STORAGE_KEY } from '@/constants/storage';
import { CacheUserInfo } from '@/typings/user';

export default class {
  get value(): CacheUserInfo {
    return getItem(STORAGE_KEY.USER) || {};
  }

  setValue(info: CacheUserInfo) {
    const oldInfo = this.value;
    setItem(STORAGE_KEY.USER, { ...oldInfo, ...info });
  }

  clear() {
    this.setValue({} as CacheUserInfo);
  }
}
