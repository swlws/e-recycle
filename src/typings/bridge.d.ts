interface IProvinceCityDistrict {
  province: string;
  city: string;
  district: string;
}

/**
 * 选择位置
 */
export interface IChooseLocation extends IProvinceCityDistrict {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
  /** 位置，详细地址 */
  address: string;
  /** 位置，简称 */
  name: string;
}

/**
 * 模糊位置
 */
export interface IFuzzyLocation extends IProvinceCityDistrict {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
}
