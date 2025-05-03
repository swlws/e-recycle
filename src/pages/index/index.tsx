import { useLoad } from '@tarojs/taro';
import MainPageLayout from '@/layout/main-page-layout';
import { MainPageList } from './data';
import CacheMgr from '@/cache';
import { addRecond, ENUM_LOG_TYPE } from '@/monitor';
import api from '@/api';

import './index.scss';

function checkNetwork() {
  api.ops.alive().then(() => {
    console.log('network alive');
  });
}

export default function Index() {
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
