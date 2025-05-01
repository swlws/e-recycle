import { useLoad } from '@tarojs/taro';
import MainPageLayout from '@/layout/main-page-layout';
import { MainPageList } from './data';
import CacheMgr from '@/cache';

import api from '@/api';

import './index.scss';
import { getCurrentInstance } from '@tarojs/runtime';

function checkNetwork() {
  api.ops.alive().then(() => {
    console.log('network alive');
  });
}

export default function Index() {
  useLoad(() => {
    // 检查网络
    checkNetwork();

    // 邀请人ID
    const inviteUid = getCurrentInstance().router?.params?.scene as string;
    CacheMgr.inviter.setValue(inviteUid);
  });

  return <MainPageLayout mainPageList={MainPageList} />;
}
