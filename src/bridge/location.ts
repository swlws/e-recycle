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

/**
 * 地址逆解析
 * @param longitude
 * @param latitude
 */
export function geocoder(longitude: number, latitude: number) {
  const url = `https://apis.map.qq.com/ws/geocoder/v1?location=${latitude},${longitude}&key=4JCBZ-YMEC5-S36IP-IGKOV-R6LP7-JWFI3&get_poi=1`;

  return Taro.request({ url, method: 'GET' })
    .then((res) => {
      console.log(res);
      const address_component = res?.data?.result?.address_component;
      if (!address_component) {
        return null;
      }

      const { province, city, district } = address_component;
      return { province, city, district };
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

// https://apis.map.qq.com/ws/geocoder/v1?location=39.984154,116.307490&key=4JCBZ-YMEC5-S36IP-IGKOV-R6LP7-JWFI3&get_poi=1

export function getCurrentLocation() {
  Taro.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1?location=39.984154,116.307490&key=4JCBZ-YMEC5-S36IP-IGKOV-R6LP7-JWFI3&get_poi=1',
    method: 'GET',
  }).then((res) => {
    console.log(res);
  });
}
