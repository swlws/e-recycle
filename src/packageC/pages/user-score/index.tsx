import { View } from '@tarojs/components';
import { useRef, useState } from 'react';
import PullAndLoadMoreList from '@/business/pull-and-load-more-list';
import { LoadListFn } from '@/typings';
import api from '@/api';
import { useDidShow } from '@tarojs/taro';
import ChildPageLayout from '@/layout/child-page-layout';
import { IScoreItem } from '@/typings/user';
import ScoreCard from './components/scroe-card';

import './index.scss';

/**
 * 加载用户总积分
 * @returns
 */
function loadUserScore() {
  return api.score.queryUserScore().then(({ r0, res }) => {
    if (r0 !== 0) {
      return 0;
    } else {
      return res;
    }
  });
}

/** 加载列表数据 */
const loadList: LoadListFn<Partial<IScoreItem>> = ({ page: number }) => {
  return new Promise((resolve) => {
    api.score
      .queryUserScoreList({
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
const itemRender = (item: IScoreItem, index: number) => {
  return (
    <View className="score-item" key={index}>
      <View className="score-item__title">{item.type}</View>
      <View className="score-item__score">{item.score}</View>
    </View>
  );
};

export default function ScoreList() {
  const [score, setScore] = useState(0);
  const pullAndLoadMoreListRef = useRef<any>();

  useDidShow(() => {
    pullAndLoadMoreListRef.current?.refresh();
  });

  loadUserScore().then((res) => {
    setScore(res);
  });

  return (
    <ChildPageLayout>
      <View className="user-score-list">
        <ScoreCard score={score}></ScoreCard>

        <PullAndLoadMoreList
          ref={pullAndLoadMoreListRef}
          loadList={loadList}
          itemRender={itemRender}
        />
      </View>
    </ChildPageLayout>
  );
}
