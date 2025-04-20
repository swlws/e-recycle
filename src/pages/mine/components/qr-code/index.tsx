import { gotoPage } from '@/bridge/navigator';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';

export default function QrCode() {
  const handleClick = () => {
    gotoPage(ENUM_ROUTE_PATH.USER_QR_CODE);
  };

  return (
    <View className="qr-code">
      <Cell title="邀请码" isLink onClick={handleClick}></Cell>
    </View>
  );
}
