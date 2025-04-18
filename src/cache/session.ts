import { getItem, setItem } from '@/bridge/storage';
import { STORAGE_KEY } from '@/constants/storage';

interface Session {
  code: string;
}

export default class {
  get value(): Session {
    return getItem(STORAGE_KEY.SESSION) || {};
  }

  setValue(value: STORAGE_KEY.SESSION) {
    setItem(STORAGE_KEY.SESSION, value);
  }

  clear() {
    this.setValue({} as STORAGE_KEY.SESSION);
  }
}
