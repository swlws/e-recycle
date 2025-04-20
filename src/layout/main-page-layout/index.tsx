import { View } from '@tarojs/components';
import { FixedView, Tabbar } from '@taroify/core';
import React, { useState } from 'react';

import { IMainPage } from '@/typings';
import './index.scss';

interface MainPageLayoutProps {
  mainPageList: IMainPage[];
}

/**
 * 一级页面的布局
 */
export default function MainPageLayout(props: MainPageLayoutProps) {
  const { mainPageList } = props;

  const [activePageIndex, setActivePageIndex] = useState(0);

  // 切换页面的处理函数
  const handleTabClick = (index: number) => {
    if (index !== activePageIndex) {
      setActivePageIndex(index);
    }
  };

  return (
    <View className="main-page-layout">
      {/* 主内容区域 */}
      <View className="main-page-layout__main">
        {/* 动态渲染当前选中的组件 */}
        {mainPageList[activePageIndex] &&
          React.createElement(mainPageList[activePageIndex].component, {}, null)}
      </View>

      {/* 底部导航栏 */}
      <FixedView position="bottom" className="main-page-layout__footer">
        <Tabbar value={activePageIndex} onChange={handleTabClick}>
          {mainPageList.map((item, index) => (
            <Tabbar.TabItem key={item.name} value={index} onClick={() => handleTabClick(index)}>
              {item.nameZh}
            </Tabbar.TabItem>
          ))}
        </Tabbar>
      </FixedView>
    </View>
  );
}
