import { getCurrentLocation } from '@/bridge/location';
import ChildPageLayout from '@/layout/child-page-layout';
import { Button } from '@taroify/core';
import { View } from '@tarojs/components';

export default function ChildPage() {
  return (
    <ChildPageLayout>
      <View>Test</View>

      <Button onClick={getCurrentLocation}>click</Button>
    </ChildPageLayout>
  );
}
