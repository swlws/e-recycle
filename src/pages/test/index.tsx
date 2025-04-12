import { geocoder, getFuzzyLocation } from '@/bridge/location';
import ChildPageLayout from '@/layout/child-page-layout';
import { Button } from '@taroify/core';
import { View } from '@tarojs/components';
import CacheMgr from '@/cache/index';

export default function ChildPage() {
  const getCurrentLocation = () => {
    const { longitude, latitude } = CacheMgr.chooseLocation.value;
    geocoder(longitude, latitude).then((res) => {
      console.log(res, 'res');
    });

    getFuzzyLocation().then((res) => {
      console.log(res, 'getFuzzyLocation');
    });
  };

  return (
    <ChildPageLayout>
      <View>Test</View>

      <Button onClick={getCurrentLocation}>click</Button>
    </ChildPageLayout>
  );
}
