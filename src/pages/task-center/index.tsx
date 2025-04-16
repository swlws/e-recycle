import { useState } from 'react';
import { Cell, Search } from '@taroify/core';
import { View } from '@tarojs/components';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import NCard from '@/components/n-card';
import { LoadListFn } from '@/typings';

import './index.scss';
import { ITaskInfo } from '@/typings/task';
import { LocationOutlined } from '@taroify/icons';
import CacheMgr from '@/cache/index';
import { IChooseLocation } from '@/typings/bridge';
import { chooseLocation } from '@/bridge/location';

export default function TaskCenter() {
  const [locationInfo, setLocationInfo] = useState(() => {
    return CacheMgr.chooseLocation.value as IChooseLocation;
  });

  function onSearch(value: string) {}

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

  const handleClickEvent = () => {
    chooseLocation().then((res) => {
      // 组件状态
      setLocationInfo(res);
      // 缓存状态
      CacheMgr.chooseLocation.setValue(res);
    });
  };

  const itemRender = (item: ITaskInfo, index: number) => {
    return <NCard key={index}></NCard>;
  };

  return (
    <View className="task-center">
      <Cell
        rightIcon={<LocationOutlined size={20} />}
        title={locationInfo.name || '点击选择地址'}
        isLink
        clickable
        onClick={handleClickEvent}
      ></Cell>

      <PullAndLoadMoreList loadList={loadList} itemRender={itemRender} />
    </View>
  );
}
