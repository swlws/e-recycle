import { getItem, setItem } from '@/bridge/storage';
import { IFuzzyLocation } from '@/typings/bridge';

const KEY_LOCATION = 'fuzzy_location';

export default class {
  get value(): IFuzzyLocation {
    return getItem(KEY_LOCATION) || {};
  }

  setValue(info: IFuzzyLocation) {
    setItem(KEY_LOCATION, info);
  }

  clear() {
    this.setValue({} as IFuzzyLocation);
  }
}
