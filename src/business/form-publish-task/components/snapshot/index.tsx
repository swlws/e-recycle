import { Flex, Image } from '@taroify/core';
import { View } from '@tarojs/components';

import './index.scss';

interface SnapshotProps {}

export default function Snapshot(props: SnapshotProps) {
  const imageList = [
    'https://img.yzcdn.cn/vant/cat.jpeg',
    'https://img.yzcdn.cn/vant/cat.jpeg',
    'https://img.yzcdn.cn/vant/cat.jpeg',
  ];

  return (
    <View className="form-publish-task__snapshot">
      <Flex justify="space-between">
        {imageList.map((item, index) => {
          return (
            <Flex.Item span={8} key={index}>
              <Image lazyLoad width={200} height={200} src={item} fallback="加载失败" />
            </Flex.Item>
          );
        })}
      </Flex>
    </View>
  );
}
