import { Avatar, Cell, Flex } from '@taroify/core';
import { View } from '@tarojs/components';
import LoginPopup from './login-popup';
import { useRef, useState } from 'react';
import { CacheUserInfo } from '@/typings/user';
import CacheMgr from '@/cache';
import { getWxCode } from '@/bridge/user';
import api from '@/api';
import { phoneNumberFormatter } from '@/utils/tool';

/**
 * 用户登录
 * @param iv
 * @param encryptedData
 */
async function userLogin(iv: string, encryptedData: string) {
  const code = await getWxCode();
  const inviter = CacheMgr.inviter.value;
  return api.auth.login({ code, iv, encryptedData, inviter });
}

/**
 * 更新用户信息
 * @param iv
 * @param encryptedData
 */
async function updateUserInfo(iv: string, encryptedData: string) {
  const code = await getWxCode();
  return api.auth.updateUserInfo({ code, iv, encryptedData });
}

interface UserInfoProps {
  onLoginSuccess?: () => void;
}

export default function UserInfo(props: UserInfoProps) {
  const [userProfile, setUserProfile] = useState<CacheUserInfo>(CacheMgr.user.value);
  const LoginPopupRef = useRef<any>();

  const openLoginPopup = () => {
    if (userProfile.phoneNumber) return;
    LoginPopupRef.current?.show();
  };

  const updateUserProfile = (
    type: 'login' | 'update',
    info: { iv: string; encryptedData: string }
  ) => {
    if (type === 'login') {
      userLogin(info.iv, info.encryptedData).then((res) => {
        if (res.r0 !== 0) return;

        CacheMgr.user.setValue(res.res);
        setUserProfile(res.res);

        props.onLoginSuccess?.();
      });
    } else {
      updateUserInfo(info.iv, info.encryptedData).then((res) => {
        if (res.r0 !== 0) return;

        CacheMgr.user.setValue(res.res);
        setUserProfile(res.res);
      });
    }
  };

  return (
    <Cell>
      <Flex className="user-info" style={{ height: '58px' }} onClick={openLoginPopup}>
        <Avatar src={userProfile.avatarUrl || 'https://robohash.org/e-'} size="large"></Avatar>

        <Flex direction="column" justify="center" style={{ height: '100%', marginLeft: '16px' }}>
          <Flex.Item>{userProfile.phoneNumber && <View>{userProfile.nickName}</View>}</Flex.Item>

          <Flex.Item>
            <View>
              {userProfile.phoneNumber
                ? phoneNumberFormatter(userProfile.phoneNumber, true)
                : '请点击登陆'}
            </View>
          </Flex.Item>
        </Flex>
      </Flex>

      <LoginPopup ref={LoginPopupRef} onSuccess={updateUserProfile}></LoginPopup>
    </Cell>
  );
}
