import { View } from '@tarojs/components';
import UserInfo from './components/user-info';
import Trade from './components/trade';
import { Cell } from '@taroify/core';
import QrCode from './components/qr-code';

export default function Mine() {
  return (
    <View className="page-mine">
      <UserInfo></UserInfo>

      <Cell.Group inset style={{ marginTop: '16px' }}>
        <Trade></Trade>
      </Cell.Group>

      <Cell.Group inset style={{ marginTop: '16px' }}>
        <QrCode></QrCode>
      </Cell.Group>
    </View>
  );
}
