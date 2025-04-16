/**
 * 选择位置
 */
export interface IChooseLocation {
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
export interface IFuzzyLocation {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
  /** 省 */
  province: string;
  /** 市 */
  city: string;
  /** 区 */
  district: string;
}
