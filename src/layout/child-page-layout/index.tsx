import { View } from '@tarojs/components';

import './index.scss';

interface ChildPageLayoutProps {
  children: React.ReactNode;
}

/**
 * 子页面的布局
 * @param props
 */
export default function ChildPageLayout(props: ChildPageLayoutProps) {
  const { children } = props;

  return <View className="child-page-layout">{children}</View>;
}
