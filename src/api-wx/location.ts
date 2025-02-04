import Taro from "@tarojs/taro";

// 选择地址
export function chooseLocation() {
  return new Promise((resolve, reject) => {
    Taro.chooseLocation({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

// 当前定位 位置
export function getLocation() {
  return new Promise((resolve, reject) => {
    Taro.getLocation({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
