import { gotoPage } from '@/bridge/navigator';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import { checkLoginState } from '@/utils/user';
import { Badge, Grid } from '@taroify/core';
import { PhotoOutlined } from '@taroify/icons';
import { View } from '@tarojs/components';

export default function Trade() {
  const handleClick = (path: ENUM_ROUTE_PATH) => {
    if (!checkLoginState()) return;

    gotoPage(path);
  };

  return (
    <View className="page-trade">
      {/* <Cell title="交易"></Cell> */}

      <Grid columns={3}>
        <Grid.Item
          icon={<PhotoOutlined />}
          badge={<Badge content={10} max={99} />}
          text="我发布的"
          onClick={() => handleClick(ENUM_ROUTE_PATH.PUBLISHED_LIST)}
        />

        <Grid.Item
          icon={<PhotoOutlined />}
          badge={<Badge content={20} max={99} />}
          text="我卖出的"
          onClick={() => handleClick(ENUM_ROUTE_PATH.SELL_OUT_LIST)}
        />

        <Grid.Item
          icon={<PhotoOutlined />}
          badge={<Badge content={100} max={99} />}
          text="我买到的"
          onClick={() => handleClick(ENUM_ROUTE_PATH.BUY_IN_LIST)}
        />
      </Grid>
    </View>
  );
}
