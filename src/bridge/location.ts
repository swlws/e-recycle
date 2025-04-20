import { IChooseLocation, IFuzzyLocation } from '@/typings/bridge';
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
          geocoder(res.longitude, res.latitude).then((addresInfo) => {
            const info: IChooseLocation = { ...res, province: '', city: '', district: '' };

            if (addresInfo) {
              Object.assign(info, addresInfo);
            }

            delete info.errMsg;
            resolve(info);
          });
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
 * 获取当前的模糊位置
 * @returns
 */
export function getFuzzyLocation(): Promise<IFuzzyLocation | null> {
  return Taro.getLocation({ type: 'gcj02' }).then((res) => {
    if (res.errMsg === 'getLocation:ok') {
      const { latitude, longitude } = res;
      return geocoder(longitude, latitude).then((addresInfo) => {
        if (!addresInfo) return null;
        return { latitude, longitude, ...addresInfo };
      });
    }
    return null;
  });
}

/**
 * 地址逆解析
 * @param longitude
 * @param latitude
 */
export function geocoder(longitude: number, latitude: number) {
  const mapKey = '4JCBZ-YMEC5-S36IP-IGKOV-R6LP7-JWFI3';
  const url = `https://apis.map.qq.com/ws/geocoder/v1?location=${latitude},${longitude}&key=${mapKey}&get_poi=1`;

  return Taro.request({ url, method: 'GET' })
    .then((res) => {
      if (res.errMsg !== 'request:ok') return null;

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

/**
 * 打开地图
 * @param location
 */
export function openLocation(location: IChooseLocation) {
  // 调用打开地图
  Taro.openLocation({
    latitude: location.latitude, // 纬度
    longitude: location.longitude, // 经度
    name: location.name,
    address: location.address,
    scale: 18,
  });
}

/**
 * 打开百度地图
 * @param location
 */
export function openBaiduMap(location: IChooseLocation) {
  const { latitude, longitude, name, address } = location;
  const url = `https://api.map.baidu.com/marker?location=${latitude},${longitude}&title=${name}&content=${address}&output=html`;
  Taro.navigateTo({
    url: `/pages/webview/index?url=${encodeURIComponent(url)}`,
  });
}
