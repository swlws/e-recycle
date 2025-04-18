import { getItem, setItem } from '@/bridge/storage';

interface Session {
  code: string;
}

const KEY_SESSION = 'session';

export default class {
  get value(): Session {
    return getItem(KEY_SESSION) || {};
  }

  setValue(value: Session) {
    setItem(KEY_SESSION, value);
  }

  clear() {
    this.setValue({} as Session);
  }
}
