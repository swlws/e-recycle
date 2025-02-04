import React from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

const Banner: React.FC = () => {
  return (
    <View className='e-banner'>
      <View className='e-banner-content'>
        <Text className='e-main-title'>E速收</Text>
        <Text className='e-sub-title'>让回收变得更快更高效</Text>
      </View>
    </View>
  );
};

export default Banner;
