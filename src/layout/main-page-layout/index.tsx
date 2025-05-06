import { Text, View } from '@tarojs/components';
import { Tabbar } from '@taroify/core';
import React, { useState } from 'react';
import { getSystemInfoSync } from '@tarojs/taro';

import { IMainPage } from '@/typings';
import './index.scss';
import Taro from '@tarojs/taro';

interface MainPageLayoutProps {
  mainPageList: IMainPage[];
}

export default function MainPageLayout(props: MainPageLayoutProps) {
  const { mainPageList } = props;
  const { statusBarHeight } = getSystemInfoSync();

  const [activePageIndex, setActivePageIndex] = useState(0);

  // 切换页面的处理函数
  const handleTabClick = (index: number) => {
    if (index !== activePageIndex) {
      setActivePageIndex(index);
      Taro.setNavigationBarTitle({
        title: mainPageList[index].nameZh,
      });
    }
  };

  const getBaner = () => {
    return (
      <View className="e-banner" style={{ paddingTop: `${statusBarHeight}px` }}>
        <View className="e-banner-content">
          <Text className="e-main-title">E速收</Text>
          <Text className="e-sub-title">让回收变得更快更高效</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="main-page-layout">
      {getBaner()}

      {/* 主内容区域 */}
      <View className="main-page-layout__main">
        {mainPageList[activePageIndex] &&
          React.createElement(mainPageList[activePageIndex].component, {}, null)}
      </View>

      {/* 底部导航栏 */}
      <View className="main-page-layout__footer">
        <Tabbar value={activePageIndex} onChange={handleTabClick}>
          {mainPageList.map((item, index) => (
            <Tabbar.TabItem key={item.name} value={index} onClick={() => handleTabClick(index)}>
              {item.nameZh}
            </Tabbar.TabItem>
          ))}
        </Tabbar>
      </View>
    </View>
  );
}
