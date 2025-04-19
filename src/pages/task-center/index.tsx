import { useMemo, useState } from 'react';
import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import NCard from '@/components/n-card';
import { LoadListFn } from '@/typings';
import { ITaskInfo } from '@/typings/task';
import { LocationOutlined } from '@taroify/icons';
import CacheMgr from '@/cache/index';
import { IFuzzyLocation } from '@/typings/bridge';
import { getFuzzyLocation } from '@/bridge/location';
import { gotoPage } from '@/bridge/navigator';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import api from '@/api';

import './index.scss';

/** 加载列表数据 */
const loadList: LoadListFn<Partial<ITaskInfo>> = ({ page: number }) => {
  return new Promise((resolve) => {
    api.task
      .queryAllTask({
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
    gotoPage(ENUM_ROUTE_PATH.TASK_DETAIL, { _id: item._id });
  };

  return <NCard key={index} index={index} onClick={openTaskDetailPage}></NCard>;
};

export default function TaskCenter() {
  const [locationInfo, setLocationInfo] = useState(() => {
    return CacheMgr.fuzzyLocation.value as IFuzzyLocation;
  });

  const locationStr = useMemo(() => {
    const { province, city, district } = locationInfo;
    if (!province && !city && !district) return '请选择地址';

    return `${province}/${city}/${district}`;
  }, [locationInfo]);

  const getProvinceCityDistrict = () => {
    getFuzzyLocation().then((res) => {
      if (!res) return;

      // 组件状态
      setLocationInfo(res);
      // 缓存状态
      CacheMgr.fuzzyLocation.setValue(res);
    });
  };

  return (
    <View className="task-center">
      <Cell
        className="location-cell"
        rightIcon={<LocationOutlined size={20} />}
        title={locationStr}
        isLink
        clickable
        onClick={getProvinceCityDistrict}
      ></Cell>

      <PullAndLoadMoreList loadList={loadList} itemRender={itemRender} />
    </View>
  );
}
