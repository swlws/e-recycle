import HomePage from '@/pages/home';
import MinePage from '@/pages/mine';
import TaskCenter from '@/pages/task-center';

import PublishImg from '@/asset/publish.png';
import TakeImg from '@/asset/take.png';
import MineImg from '@/asset/mine.png';

import { IMainPage } from '@/typings';

export const MainPageList: IMainPage[] = [
  {
    name: 'home',
    nameZh: '发布',
    icon: PublishImg,
    component: HomePage,
  },
  {
    name: 'list',
    nameZh: '接单',
    icon: TakeImg,
    component: TaskCenter,
  },
  {
    name: 'mine',
    nameZh: '我的',
    icon: MineImg,
    component: MinePage,
  },
];
