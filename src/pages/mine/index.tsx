import { View } from '@tarojs/components';
import UserInfo from './components/user-info';
import Trade from './components/trade';
import { Cell } from '@taroify/core';
import QrCode from './components/qr-code';
import { useRef } from 'react';
import { useDidShow } from '@tarojs/taro';

export default function Mine() {
  const tradeRef = useRef<any>();

  const handleLoginSuccess = () => {
    tradeRef.current?.forceUpdate();
  };

  useDidShow(() => {
    tradeRef.current?.forceUpdate();
  });

  return (
    <View className="page-mine">
      <UserInfo onLoginSuccess={handleLoginSuccess}></UserInfo>

      <Cell.Group inset style={{ marginTop: '16px' }}>
        <Trade ref={tradeRef}></Trade>
      </Cell.Group>

      <Cell.Group inset style={{ marginTop: '16px' }}>
        <QrCode></QrCode>
      </Cell.Group>
    </View>
  );
}
