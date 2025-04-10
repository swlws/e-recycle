import { IChooseLocation } from '@/typings/bridge';
import Taro from '@tarojs/taro';

/**
 * 选择定位
 * @returns latitude 纬度 number
 * @returns longitude 经度 number
 * @returns name 位置名称 string
 * @returns address 详细地址 string
 */
export function chooseLocation(): Promise<IChooseLocation> {
  return new Promise((resolve, reject) => {
    Taro.chooseLocation({
      success: (res) => {
        if (res.errMsg === 'chooseLocation:ok') {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
