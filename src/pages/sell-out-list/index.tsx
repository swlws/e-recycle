import { Search } from '@taroify/core';
import { View } from '@tarojs/components';

import './index.scss';
import { useState } from 'react';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import NCard from '@/components/n-card';
import { LoadListFn } from '@/typings';

export default function PublishedTaskList() {
  const [searchValue, setSearchValue] = useState('');

  function onSearch(value: string) {}

  const loadList: LoadListFn<any> = ({ page: number }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          total: 50,
          list: Array.from({ length: 10 }).map((_, index) => ({
            id: index,
            title: `任务${index}`,
            content: `任务内容${index}`,
          })),
        });
      }, 300);
    });
  };

  const itemRender = (item: any, index: number) => {
    return <NCard key={index}></NCard>;
  };

  return (
    <View className="sell-out-list">
      <Search
        value={searchValue}
        placeholder="请输入搜索关键词"
        onChange={(e) => onSearch(e.detail.value)}
      />

      <PullAndLoadMoreList loadList={loadList} itemRender={itemRender} />
    </View>
  );
}
