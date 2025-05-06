import Taro from '@tarojs/taro';

/** 检查登录态 */
function checkSession() {
  return new Promise((resolve, reject) => {
    Taro.checkSession({
      success: () => {
        resolve('');
      },
      fail: () => {
        reject();
      },
    });
  });
}

/**
 * 登录接口，获取code，用于获取用户的openid和session_key
 * @returns
 */
function login() {
  return new Promise((resolve, reject) => {
    Taro.login({
      timeout: 24 * 60 * 60 * 1000, // 24小时。超时时间，单位 ms。
      success: (res) => {
        if (res.code) {
          resolve(res.code);
        } else {
          console.error('登录失败！' + res.errMsg);
          reject(res.errMsg);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * 获取微信 Code，用于获取用户的openid和session_key
 * @returns
 */
export function getWxCode() {
  return login();
}

/**
 * 获取用户头像、昵称
 * @returns
 */
export function getUserProfile(): Promise<{ iv: string; encryptedData: string }> {
  return new Promise((resolve, reject) => {
    Taro.getUserInfo({
      // desc: '用于完善用户昵称、头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('getUserProfile', res);
        const { iv, encryptedData } = res;
        resolve({ iv, encryptedData });
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
