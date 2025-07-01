import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import { updateUserToken } from './utils/user';

import './app.scss';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');

    updateUserToken();
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
