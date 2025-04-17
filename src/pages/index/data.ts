import HomePage from '@/pages/home';
import MinePage from '@/pages/mine';
import TaskCenter from '@/pages/task-center';

import { IMainPage } from '@/typings';

export const MainPageList: IMainPage[] = [
  {
    name: 'home',
    nameZh: '首页',
    component: HomePage,
  },
  {
    name: 'list',
    nameZh: '列表',
    component: TaskCenter,
  },
  {
    name: 'mine',
    nameZh: '我的',
    component: MinePage,
  },
];
