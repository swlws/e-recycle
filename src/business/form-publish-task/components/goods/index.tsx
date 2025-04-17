import { Cell, Checkbox } from '@taroify/core';
import { View } from '@tarojs/components';

interface GoodsProps {
  value: any[];
  onChange?: (key: string, value: any[]) => void;
  readonly?: boolean;
}

export default function Goods(props: GoodsProps) {
  const goodsList = ['商品1', '商品2', '商品3'];

  const handleChange = (list: any[]) => {
    props.onChange?.('goods', list);
  };

  return (
    <View className="form-publish-task__goods">
      <Cell title="分类"></Cell>

      <View style={{ padding: '16px' }}>
        <Checkbox.Group direction="horizontal" onChange={handleChange}>
          {goodsList.map((item, index) => {
            return (
              <Checkbox key={index} name={item} disabled={props.readonly}>
                {item}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </View>
    </View>
  );
}
