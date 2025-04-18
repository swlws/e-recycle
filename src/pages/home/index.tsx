import { Button, Space } from '@taroify/core';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import { gotoPage } from '@/bridge/navigator';
import { getWxCode } from '@/bridge/user';

export default function Mine() {
  const handleClick = (path: ENUM_ROUTE_PATH) => {
    gotoPage(path);
  };

  const getUserWxCode = () => {
    getWxCode().then((code) => {
      console.log('wxCode', code);
    });
  };

  return (
    <Space direction="vertical" fill style={{ padding: '16px' }}>
      <Button color="primary" block onClick={() => handleClick(ENUM_ROUTE_PATH.PUBLISH_TASK)}>
        表单
      </Button>

      <Button color="primary" block onClick={() => handleClick(ENUM_ROUTE_PATH.Test)}>
        Test 页面
      </Button>

      <Button color="primary" block onClick={getUserWxCode}>
        getWxCode
      </Button>
    </Space>
  );
}
