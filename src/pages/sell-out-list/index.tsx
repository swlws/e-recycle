import { Search } from '@taroify/core';
import { View } from '@tarojs/components';

import './index.scss';
import { useState } from 'react';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import NCard from '@/components/n-card';

export default function PublishedTaskList() {
  const [searchValue, setSearchValue] = useState('');

  function onSearch(value: string) {}

  return (
    <View className="sell-out-list">
      <Search
        value={searchValue}
        placeholder="请输入搜索关键词"
        onChange={(e) => onSearch(e.detail.value)}
      />

      <PullAndLoadMoreList itemRender={(item, index) => <NCard key={index}></NCard>} />
    </View>
  );
}
