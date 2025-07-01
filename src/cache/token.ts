import { getItem, setItem } from '@/bridge/storage';
import { STORAGE_KEY } from '@/constants/storage';

export default class {
  get value(): string {
    return getItem(STORAGE_KEY.TOKEN) || '';
  }

  setValue(token: string) {
    setItem(STORAGE_KEY.TOKEN, token);
  }

  clear() {
    this.setValue('');
  }
}
