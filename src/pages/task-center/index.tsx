import { useState } from 'react';
import { Search } from '@taroify/core';
import { View } from '@tarojs/components';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import NCard from '@/components/n-card';
import { LoadListFn } from '@/typings';

import './index.scss';
import { ITaskInfo } from '@/typings/task';

export default function TaskCenter() {
  const [searchValue, setSearchValue] = useState('');

  function onSearch(value: string) {
    setSearchValue(value);
  }

  const loadList: LoadListFn<Partial<ITaskInfo>> = ({ page: number }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          total: 50,
          list: Array.from({ length: 10 }).map((_, index) => ({
            _id: '' + index,
          })),
        });
      }, 300);
    });
  };

  const itemRender = (item: ITaskInfo, index: number) => {
    return <NCard key={index}></NCard>;
  };

  return (
    <View className="task-center">
      <Search
        value={searchValue}
        placeholder="请输入搜索关键词"
        onChange={(e) => onSearch(e.detail.value)}
      />

      <PullAndLoadMoreList loadList={loadList} itemRender={itemRender} />
    </View>
  );
}
