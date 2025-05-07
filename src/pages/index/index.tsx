import { useLoad, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import MainPageLayout from '@/layout/main-page-layout';
import { MainPageList } from './data';
import CacheMgr from '@/cache';
import { addRecond, ENUM_LOG_TYPE } from '@/monitor';
import api from '@/api';
import LogoImg from '@/asset/logo.png';
import JiuWuHuiShou from '@/asset/images/jiuwuhuishou.png';

import './index.scss';
import { useState } from 'react';
import { Text, View } from '@tarojs/components';
import { Image } from '@taroify/core';

function checkNetwork() {
  return api.ops
    .alive()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export default function Index() {
  const [networkError, setNetworkError] = useState(false);

  // 分享给朋友
  useShareAppMessage(() => {
    const uid = CacheMgr.user.value._id;
    return {
      title: 'E速收 - 让回收变得更快更高效',
      path: `/pages/index/index?scene=${uid}&orgin=friend`,
      imageUrl: JiuWuHuiShou, // 5:4
    };
  });

  // 分享到朋友圈
  useShareTimeline(() => {
    const uid = CacheMgr.user.value._id;
    return {
      title: 'E速收 - 让回收变得更快更高效',
      query: `scene=${uid}&orgin=timeline`,
      imageUrl: LogoImg, // 1:1
    };
  });

  useLoad((options) => {
    // 检查网络
    checkNetwork()
      .then((isAlive) => {
        setNetworkError(!isAlive);
      })
      .catch(() => {
        setNetworkError(true);
      });

    // 邀请人ID
    const inviterUid = options.scene as string;
    CacheMgr.inviter.setValue(inviterUid);

    // 日志上报
    const payload = { type: ENUM_LOG_TYPE.CUSTOM, inviter: inviterUid };
    addRecond(payload);
  });

  if (networkError) {
    return (
      <View className="network-error">
        <Image src={LogoImg} className="network-error__logo" />
        <Text className="network-error__title">服务暂停，运维中</Text>
        <Text className="network-error__subtitle">我们正在努力修复，请稍后再试</Text>
      </View>
    );
  }

  return <MainPageLayout mainPageList={MainPageList} />;
}
