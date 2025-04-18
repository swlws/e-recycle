import { getItem, setItem } from '@/bridge/storage';
import { STORAGE_KEY } from '@/constants/storage';
import { IChooseLocation } from '@/typings/bridge';

export default class {
  get value(): IChooseLocation {
    return getItem(STORAGE_KEY.CHOOSE_LOCATION) || {};
  }

  setValue(info: IChooseLocation) {
    setItem(STORAGE_KEY.CHOOSE_LOCATION, info);
  }

  clear() {
    this.setValue({} as IChooseLocation);
  }
}
