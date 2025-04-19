import api from '@/api';
import { gotoPage } from '@/bridge/navigator';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import { checkLoginState } from '@/utils/user';
import { Badge, Grid } from '@taroify/core';
import { PhotoOutlined } from '@taroify/icons';
import { View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useEffect, useState } from 'react';

export default function Trade() {
  const [countInfo, setCountInfo] = useState({ published: 0, sellout: 0, buyin: 0 });

  useEffect(() => {
    if (!checkLoginState(false)) return;

    api.task.queryUserTaskCount().then((response) => {
      if (response.r0 !== 0) return;
      setCountInfo(response.res);
    });
  }, []);

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
          badge={countInfo.published && <Badge content={countInfo.published} max={99} />}
          text="我发布的"
          onClick={() => handleClick(ENUM_ROUTE_PATH.PUBLISHED_LIST)}
        />

        <Grid.Item
          icon={<PhotoOutlined />}
          badge={countInfo.sellout && <Badge content={countInfo.sellout} max={99} />}
          text="我卖出的"
          onClick={() => handleClick(ENUM_ROUTE_PATH.SELL_OUT_LIST)}
        />

        <Grid.Item
          icon={<PhotoOutlined />}
          badge={countInfo.buyin && <Badge content={countInfo.buyin} max={99} />}
          text="我买到的"
          onClick={() => handleClick(ENUM_ROUTE_PATH.BUY_IN_LIST)}
        />
      </Grid>
    </View>
  );
}
