import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';

export default function QrCode() {
  return (
    <View className="qr-code">
      <Cell title="邀请码" isLink></Cell>
    </View>
  );
}
