import { Badge, Cell, Grid } from '@taroify/core';
import { PhotoOutlined } from '@taroify/icons';
import { View } from '@tarojs/components';

export default function Trade() {
  return (
    <View className="page-trade">
      {/* <Cell title="交易"></Cell> */}

      <Grid>
        <Grid.Item
          icon={<PhotoOutlined />}
          badge={<Badge content={10} max={99} />}
          text="我发布的"
        />

        <Grid.Item
          icon={<PhotoOutlined />}
          badge={<Badge content={20} max={99} />}
          text="我卖出的"
        />

        <Grid.Item
          icon={<PhotoOutlined />}
          badge={<Badge content={100} max={99} />}
          text="我买到的"
        />
      </Grid>
    </View>
  );
}
