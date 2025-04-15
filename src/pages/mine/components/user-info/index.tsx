import { Avatar, Cell, Flex } from '@taroify/core';
import { View } from '@tarojs/components';
import LoginPopup from './login-popup';
import { useRef } from 'react';

export default function UserInfo() {
  const LoginPopupRef = useRef<any>();

  const openLoginPopup = () => {
    LoginPopupRef.current?.show();
  };

  return (
    <Cell>
      <Flex className="user-info" style={{ height: '58px' }} onClick={openLoginPopup}>
        <Avatar src="https://joesch.moe/api/v1/random" size="large"></Avatar>

        <Flex direction="column" justify="center" style={{ height: '100%', marginLeft: '16px' }}>
          <Flex.Item>
            <View>昵称</View>
          </Flex.Item>

          <Flex.Item>
            <View>198 **** 9999</View>
          </Flex.Item>
        </Flex>
      </Flex>

      <LoginPopup ref={LoginPopupRef}></LoginPopup>
    </Cell>
  );
}
