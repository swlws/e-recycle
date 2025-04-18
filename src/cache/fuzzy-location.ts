import { getItem, setItem } from '@/bridge/storage';
import { STORAGE_KEY } from '@/constants/storage';
import { IFuzzyLocation } from '@/typings/bridge';

export default class {
  get value(): IFuzzyLocation {
    return getItem(STORAGE_KEY.FUZZY_LOCATION) || {};
  }

  setValue(info: IFuzzyLocation) {
    setItem(STORAGE_KEY.FUZZY_LOCATION, info);
  }

  clear() {
    this.setValue({} as IFuzzyLocation);
  }
}
