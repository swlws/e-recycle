import { Search } from '@taroify/core';
import { View } from '@tarojs/components';

import { useRef, useState } from 'react';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import NCard from '@/components/n-card';
import { LoadListFn } from '@/typings';
import { gotoPage } from '@/bridge/navigator';
import { ENUM_PAGE_ALIAS, ENUM_ROUTE_PATH } from '@/constants/route';
import { ITaskInfo } from '@/typings/task';
import api from '@/api';
import { useDidShow } from '@tarojs/taro';

import './index.scss';
import ChildPageLayout from '@/layout/child-page-layout';

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
  /** 打开任务详情页面 */
  const openTaskDetailPage = () => {
    gotoPage(ENUM_ROUTE_PATH.TASK_DETAIL, {
      _id: item._id,
      fromPage: ENUM_PAGE_ALIAS.SELL_OUT_LIST,
    });
  };

  return <NCard key={index} index={index} info={item} onClick={openTaskDetailPage}></NCard>;
};

export default function PublishedTaskList() {
  const [searchValue, setSearchValue] = useState('');
  const pullAndLoadMoreListRef = useRef<any>();

  function onSearch(value: string) {}

  useDidShow(() => {
    pullAndLoadMoreListRef.current?.refresh();
  });

  return (
    <ChildPageLayout>
      <View className="published-task-list">
        <Search
          value={searchValue}
          placeholder="请输入搜索关键词"
          onChange={(e) => onSearch(e.detail.value)}
        />

        <View className="published-task-list__main">
          <PullAndLoadMoreList
            ref={pullAndLoadMoreListRef}
            loadList={loadList}
            itemRender={itemRender}
          />
        </View>
      </View>
    </ChildPageLayout>
  );
}
