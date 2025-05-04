import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Cell, Space } from '@taroify/core';
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
import { ENUM_PAGE_ALIAS, ENUM_ROUTE_PATH } from '@/constants/route';
import api from '@/api';
import ListSkeleton from './list-skeleton';

import './index.scss';
import { useDidShow } from '@tarojs/taro';
import Button from '@taroify/core/button/button';
import { ENUM_TASK_STATE } from '@/constants/public';

/** 加载列表数据 */
const loadList: LoadListFn<Partial<ITaskInfo>> = ({ page: number }) => {
  const location = CacheMgr.fuzzyLocation.value;

  return new Promise((resolve) => {
    const { province, city, district } = location;
    api.task
      .queryAllTask({
        page: number,
        size: 10,
        province,
        city,
        district,
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
    gotoPage(ENUM_ROUTE_PATH.TASK_DETAIL, { _id: item._id, fromPage: ENUM_PAGE_ALIAS.TASK_CENTER });
  };

  const showButton = item.state === ENUM_TASK_STATE.PENDDING;

  return (
    <NCard key={index} index={index} info={item} onClick={openTaskDetailPage}>
      {showButton && (
        <View style={{ marginTop: '8px' }}>
          <Button color="success" block hairline size="small">
            接单
          </Button>
        </View>
      )}
    </NCard>
  );
};

export default function TaskCenter() {
  const [locationInfo, setLocationInfo] = useState(() => {
    return CacheMgr.fuzzyLocation.value as IFuzzyLocation;
  });
  const pullAndLoadMoreListRef = useRef<any>();

  const locationStr = useMemo(() => {
    const { province, city, district } = locationInfo;
    if (!province && !city && !district) return '';

    return `${province}/${city}/${district}`;
  }, [locationInfo]);

  useEffect(() => {
    const location = CacheMgr.fuzzyLocation.value;
    if (!location.longitude) {
      getProvinceCityDistrict();
    }
  }, []);

  useDidShow(() => {
    pullAndLoadMoreListRef.current?.refresh();
  });

  const getProvinceCityDistrict = useCallback(() => {
    getFuzzyLocation().then((res) => {
      if (!res) return;

      // 组件状态
      setLocationInfo(res);
      // 缓存状态
      CacheMgr.fuzzyLocation.setValue(res);
    });
  }, []);

  return (
    <View className="task-center">
      <Cell
        className="location-cell"
        rightIcon={<LocationOutlined size={20} />}
        title={locationStr || '请选择地址'}
        isLink
        clickable
        onClick={getProvinceCityDistrict}
      ></Cell>

      <View className="task-center__main">
        {locationStr ? (
          <PullAndLoadMoreList
            ref={pullAndLoadMoreListRef}
            loadList={loadList}
            itemRender={itemRender}
          />
        ) : (
          <ListSkeleton />
        )}
      </View>
    </View>
  );
}
