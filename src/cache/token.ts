import { getItem, setItem } from '@/bridge/stroage';

const KEY_TOKEN = 'token';

export default class {
  get value(): string {
    return getItem(KEY_TOKEN) || '';
  }

  setValue(value: string) {
    setItem(KEY_TOKEN, value);
  }

  clear() {
    this.setValue('');
  }
}
