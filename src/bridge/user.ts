import Taro from '@tarojs/taro';
import CacheMgr from '@/cache/index';

/** 检查登录态 */
function checkSession() {
  const code = CacheMgr.session.value.code;
  if (!code) return Promise.reject();

  return new Promise((resolve, reject) => {
    Taro.checkSession({
      success: () => {
        resolve(code);
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
          CacheMgr.session.setValue({ code: res.code });
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
  return checkSession()
    .then((code) => {
      return code;
    })
    .catch(() => {
      return login();
    });
}

interface UserProfile {
  nickName: string;
  avatarUrl: string;
}

/**
 * 获取用户头像、昵称
 * @returns
 */
export function getUserProfile(): Promise<UserProfile> {
  return new Promise((resolve, reject) => {
    Taro.getUserProfile({
      desc: '用于完善用户昵称、头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('getUserProfile', res);
        resolve(res.userInfo);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
