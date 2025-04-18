import { Avatar, Cell, Flex } from '@taroify/core';
import { View } from '@tarojs/components';
import LoginPopup from './login-popup';
import { useRef, useState } from 'react';
import { CacheUserInfo } from '@/typings/user';
import CacheMgr from '@/cache';

export default function UserInfo() {
  const [userProfile, setUserProfile] = useState<CacheUserInfo>(CacheMgr.user.value);
  const LoginPopupRef = useRef<any>();

  const openLoginPopup = () => {
    LoginPopupRef.current?.show();
  };

  const updateUserProfile = () => {
    setUserProfile(CacheMgr.user.value);
  };

  return (
    <Cell>
      <Flex className="user-info" style={{ height: '58px' }} onClick={openLoginPopup}>
        <Avatar
          src={userProfile.avatarUrl || 'https://joesch.moe/api/v1/random'}
          size="large"
        ></Avatar>

        <Flex direction="column" justify="center" style={{ height: '100%', marginLeft: '16px' }}>
          <Flex.Item>
            <View>{userProfile.nickName || '用户名'}</View>
          </Flex.Item>

          <Flex.Item>
            <View>{userProfile.phoneNumber || '请点击登陆'}</View>
          </Flex.Item>
        </Flex>
      </Flex>

      <LoginPopup ref={LoginPopupRef} onSuccess={updateUserProfile}></LoginPopup>
    </Cell>
  );
}
