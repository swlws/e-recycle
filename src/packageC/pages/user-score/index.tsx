import { Search } from '@taroify/core';
import { View } from '@tarojs/components';
import { useRef, useState } from 'react';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import { LoadListFn } from '@/typings';
import api from '@/api';
import { useDidShow } from '@tarojs/taro';
import ChildPageLayout from '@/layout/child-page-layout';
import { IScoreItem } from '@/typings/user';

import './index.scss';

/** 加载列表数据 */
const loadList: LoadListFn<Partial<IScoreItem>> = ({ page: number }) => {
  return new Promise((resolve) => {
    api.score
      .queryUserScoreList({
        page: number,
        size: 10,
      })
      .then(({ r0, res }) => {
        if (r0 !== 0) {
          resolve({
            total: 0,
            list: [],
          });
        } else {
          resolve(res);
        }
      });
  });
};

/** 渲染卡片 */
const itemRender = (item: IScoreItem, index: number) => {
  return (
    <View className="score-item" key={index}>
      <View className="score-item__title">{item.type}</View>
      <View className="score-item__score">{item.score}</View>
    </View>
  );
};

export default function ScoreList() {
  const [searchValue, setSearchValue] = useState('');
  const pullAndLoadMoreListRef = useRef<any>();

  function onSearch(value: string) {}

  useDidShow(() => {
    pullAndLoadMoreListRef.current?.refresh();
  });

  return (
    <ChildPageLayout>
      <View className="user-score-list">
        <Search
          value={searchValue}
          placeholder="请输入搜索关键词"
          onChange={(e) => onSearch(e.detail.value)}
        />

        <PullAndLoadMoreList
          ref={pullAndLoadMoreListRef}
          loadList={loadList}
          itemRender={itemRender}
        />
      </View>
    </ChildPageLayout>
  );
}
