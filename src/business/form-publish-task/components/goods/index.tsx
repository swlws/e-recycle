import { ENUM_GOODS_LIST } from '@/constants/public';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import CardGroup from './card-group';

interface GoodsProps {
  value: any[];
  onChange?: (key: string, value: any[]) => void;
  readonly?: boolean;
}

export default function Goods(props: GoodsProps) {
  const [list, setList] = useState(() => {
    let list = props.value || [];
    if (list.length === 0) {
      const len = ENUM_GOODS_LIST.length;
      list = [ENUM_GOODS_LIST[len - 1].text];
    }

    props.onChange?.('goods', list);

    return list;
  });

  const handleChange = (list: any[]) => {
    if (props.readonly) return;

    if (list.length === 0) {
      Taro.showToast({
        title: '请至少选择一个分类',
        icon: 'none',
      });
      return;
    }

    props.onChange?.('goods', list);
    setList(list);
  };

  return (
    <View className="form-publish-task__goods">
      <CardGroup value={list} cards={ENUM_GOODS_LIST} onChange={handleChange} />
    </View>
  );
}
