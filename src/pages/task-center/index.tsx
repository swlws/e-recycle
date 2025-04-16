import { useMemo, useState } from 'react';
import { Cell, Search } from '@taroify/core';
import { View } from '@tarojs/components';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import NCard from '@/components/n-card';
import { LoadListFn } from '@/typings';

import { ITaskInfo } from '@/typings/task';
import { LocationOutlined } from '@taroify/icons';
import CacheMgr from '@/cache/index';
import { IFuzzyLocation } from '@/typings/bridge';
import { getFuzzyLocation } from '@/bridge/location';
import './index.scss';

export default function TaskCenter() {
  const [locationInfo, setLocationInfo] = useState(() => {
    return CacheMgr.fuzzyLocation.value as IFuzzyLocation;
  });
  const locationStr = useMemo(() => {
    const { province, city, district } = locationInfo;
    if (!province && !city && !district) return '请选择地址';
    return `${province}/${city}/${district}`;
  }, [locationInfo]);

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
    getFuzzyLocation().then((res) => {
      if (!res) return;

      // 组件状态
      setLocationInfo(res);
      // 缓存状态
      CacheMgr.fuzzyLocation.setValue(res);
    });
  };

  const itemRender = (item: ITaskInfo, index: number) => {
    return <NCard key={index}></NCard>;
  };

  return (
    <View className="task-center">
      <Cell
        rightIcon={<LocationOutlined size={20} />}
        title={locationStr}
        isLink
        clickable
        onClick={handleClickEvent}
      ></Cell>

      <PullAndLoadMoreList loadList={loadList} itemRender={itemRender} />
    </View>
  );
}
