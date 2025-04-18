import Taro from '@tarojs/taro';

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
        console.log(res.userInfo);
        resolve(res.userInfo);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
