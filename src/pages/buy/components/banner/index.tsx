import React from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

const Banner: React.FC = () => {
  return (
    <View className='banner'>
      <View className='banner-content'>
        <Text className='main-title'>E速收</Text>
        <Text className='sub-title'>做大做强</Text>
      </View>
    </View>
  );
};

export default Banner;
