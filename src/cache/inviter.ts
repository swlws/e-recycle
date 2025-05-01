import { getItem, setItem } from '@/bridge/storage';
import { STORAGE_KEY } from '@/constants/storage';

export default class {
  get value(): string {
    return getItem(STORAGE_KEY.INVITER) || '';
  }

  setValue(value: string) {
    setItem(STORAGE_KEY.INVITER, value);
  }

  clear() {
    this.setValue('');
  }
}
