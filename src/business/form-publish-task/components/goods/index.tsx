import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';

interface GoodsProps {}

export default function Goods(props: GoodsProps) {
  const goodsList = ['商品1', '商品2', '商品3'];

  return (
    <View>
      <Cell title="分类"></Cell>
    </View>
  );
}
