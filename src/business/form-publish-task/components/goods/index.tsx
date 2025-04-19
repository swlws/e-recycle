import { GOODS_LIST } from '@/constants/public';
import { Cell, Checkbox, Flex } from '@taroify/core';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';

interface GoodsProps {
  value: any[];
  onChange?: (key: string, value: any[]) => void;
  readonly?: boolean;
}

export default function Goods(props: GoodsProps) {
  const [list, setList] = useState(() => {
    let list = props.value || [];
    if (list.length === 0) {
      list = [GOODS_LIST[0]];
    }

    props.onChange?.('goods', list);

    return list;
  });

  const handleChange = (list: any[]) => {
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
      <Cell title="分类"></Cell>

      <View style={{ padding: '16px' }}>
        <Checkbox.Group value={list} direction="horizontal" onChange={handleChange}>
          <Flex wrap="wrap">
            {GOODS_LIST.map((item, index) => {
              return (
                <Flex.Item span={8} style={{ marginBottom: '8px' }}>
                  <Checkbox key={index} name={item} disabled={props.readonly}>
                    {item}
                  </Checkbox>
                </Flex.Item>
              );
            })}
          </Flex>
        </Checkbox.Group>
      </View>
    </View>
  );
}
