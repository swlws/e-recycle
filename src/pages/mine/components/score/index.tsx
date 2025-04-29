import { gotoPage } from '@/bridge/navigator';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import { checkLoginState } from '@/utils/user';
import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';

export default function UserScore() {
  const handleClick = () => {
    if (!checkLoginState()) return;

    gotoPage(ENUM_ROUTE_PATH.USER_SCORE);
  };

  return (
    <View className="user-score">
      <Cell title="积分" isLink onClick={handleClick}></Cell>
    </View>
  );
}
