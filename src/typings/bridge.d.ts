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
