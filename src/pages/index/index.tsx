import { useLoad, getCurrentInstance, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import MainPageLayout from '@/layout/main-page-layout';
import { MainPageList } from './data';
import CacheMgr from '@/cache';
import { addRecond, ENUM_LOG_TYPE } from '@/monitor';
import api from '@/api';
import LogoImg from '@/asset/logo.png';
import JiuWuHuiShou from '@/asset/images/jiuwuhuishou.png';

import './index.scss';

function checkNetwork() {
  api.ops.alive().then(() => {
    console.log('network alive');
  });
}

export default function Index() {
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
    checkNetwork();

    // 邀请人ID
    const inviterUid = options.scene as string;
    CacheMgr.inviter.setValue(inviterUid);

    // 日志上报
    const payload = { type: ENUM_LOG_TYPE.CUSTOM, inviter: inviterUid };
    addRecond(payload);
  });

  return <MainPageLayout mainPageList={MainPageList} />;
}
