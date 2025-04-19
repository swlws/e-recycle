import { Search } from '@taroify/core';
import { View } from '@tarojs/components';

import './index.scss';
import { useState } from 'react';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import NCard from '@/components/n-card';
import { LoadListFn } from '@/typings';
import { ITaskInfo } from '@/typings/task';
import { gotoPage } from '@/bridge/navigator';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import api from '@/api';

/** 打开任务详情页面 */
function openTaskDetailPage() {
  gotoPage(ENUM_ROUTE_PATH.TASK_DETAIL);
}

/** 加载列表数据 */
const loadList: LoadListFn<Partial<ITaskInfo>> = ({ page: number }) => {
  return new Promise((resolve) => {
    api.task
      .queryUserPublishedTask({
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
const itemRender = (item: ITaskInfo, index: number) => {
  return <NCard key={index} index={index} onClick={openTaskDetailPage}></NCard>;
};

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

      <PullAndLoadMoreList loadList={loadList} itemRender={itemRender} />
    </View>
  );
}
