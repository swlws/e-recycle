import { getItem, setItem } from '@/bridge/stroage';
import { IChooseLocation } from '@/typings/bridge';

const KEY_LOCATION = 'location';

export default class {
  get value(): IChooseLocation {
    return getItem(KEY_LOCATION) || {};
  }

  setValue(info: IChooseLocation) {
    setItem(KEY_LOCATION, info);
  }

  clear() {
    this.setValue({} as IChooseLocation);
  }
}
