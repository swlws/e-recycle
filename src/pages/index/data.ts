import HomePage from '@/pages/home';
import MinePage from '@/pages/mine';
import TaskCenter from '@/pages/task-center';

import { IMainPage } from '@/typings';

export const MainPageList: IMainPage[] = [
  {
    name: 'home',
    nameZh: '发布',
    component: HomePage,
  },
  {
    name: 'list',
    nameZh: '接单',
    component: TaskCenter,
  },
  {
    name: 'mine',
    nameZh: '我的',
    component: MinePage,
  },
];
