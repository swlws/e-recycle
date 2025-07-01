import api from '@/api';
import CacheMgr from '@/cache';
import Taro from '@tarojs/taro';

/**
 * 检查用户登录状态
 * @param showTip
 * @returns
 */
export function checkLoginState(showTip = true) {
  const userInfo = CacheMgr.user.value;
  if (!userInfo?._id) {
    if (showTip) {
      Taro.showToast({ title: '请先登录', icon: 'none', duration: 2000 });
    }
    return false;
  }

  return true;
}

/**
 * 更新 token
 */
export function updateUserToken() {
  const uid = CacheMgr.user.value?._id;
  if (!uid) {
    return;
  }

  api.auth.token().then((res) => {
    CacheMgr.token.setValue(res.res);
  });
}
