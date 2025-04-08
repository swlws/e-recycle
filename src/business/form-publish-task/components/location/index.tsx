import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';
import { LocationOutlined } from '@taroify/icons';

interface LocationProps {
  value: string;
  onChange?: (name: string, value: string) => void;
}

/**
 * 地址
 * @param props
 * @returns
 */
export default function Location(props: LocationProps) {
  const handleClickEvent = () => {
    console.log('点击地址');
  };

  return (
    <View className="be-form-publish-task-address">
      <Cell
        rightIcon={<LocationOutlined size={20} />}
        title="地址"
        isLink
        clickable
        onClick={handleClickEvent}
      ></Cell>

      <View className="taroify-ellipsis--l2">{props.value}</View>
    </View>
  );
}
