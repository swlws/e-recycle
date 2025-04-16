import { Search } from '@taroify/core';
import { View } from '@tarojs/components';

import './index.scss';
import { useState } from 'react';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';

export default function PublishedTaskList() {
  const [searchValue, setSearchValue] = useState('');

  function onSearch(value: string) {}

  return (
    <View className="published-task-list">
      <Search
        value={searchValue}
        placeholder="请输入搜索关键词"
        onChange={(e) => onSearch(e.detail.value)}
      />

      <PullAndLoadMoreList style={{ paddingTop: '80px' }} />
    </View>
  );
}
