import { useLoad } from '@tarojs/taro';
import MainPageLayout from '@/layout/main-page-layout';
import { MainPageList } from './data';

import api from '@/api';

import './index.scss';

export default function Index() {
  useLoad(() => {
    api.ops.alive().then(() => {
      console.log('network alive');
    });
  });

  return <MainPageLayout mainPageList={MainPageList} />;
}
