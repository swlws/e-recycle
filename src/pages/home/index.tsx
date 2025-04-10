import { gotoPage } from '@/taro-api/router';
import { Button, Space } from '@taroify/core';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import { View } from '@tarojs/components';

export default function Mine() {
  const handleClick = (path: ENUM_ROUTE_PATH) => {
    gotoPage(path);
  };

  return (
    <View>
      <Button color="primary" block onClick={() => handleClick(ENUM_ROUTE_PATH.PUBLISH_TASK)}>
        表单
      </Button>

      <Button color="primary" block onClick={() => handleClick(ENUM_ROUTE_PATH.Test)}>
        Test 页面
      </Button>
    </View>
  );
}
