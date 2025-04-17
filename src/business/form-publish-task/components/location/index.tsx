import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';
import { LocationOutlined } from '@taroify/icons';
import { chooseLocation } from '@/bridge/location';
import { useState } from 'react';
import { IChooseLocation } from '@/typings/bridge';
import CacheMgr from '@/cache/index';

interface LocationProps {
  value: IChooseLocation;
  onChange?: (name: string, value: IChooseLocation) => void;
  readonly?: boolean;
}

/**
 * 地址
 * @param props
 * @returns
 */
export default function Location(props: LocationProps) {
  const [locationInfo, setLocationInfo] = useState(() => {
    return props.value || (CacheMgr.chooseLocation.value as IChooseLocation);
  });

  const handleClickEvent = () => {
    if (props.readonly) return;

    chooseLocation().then((res) => {
      // 组件状态
      setLocationInfo(res);
      // 缓存状态
      CacheMgr.chooseLocation.setValue(res);
      // 表单状态
      props.onChange && props.onChange('location', res);
    });
  };

  return (
    <View className="be-form-publish-task-address">
      <Cell
        rightIcon={<LocationOutlined size={20} />}
        title={locationInfo.name || '点击选择地址'}
        isLink
        clickable
        onClick={handleClickEvent}
      ></Cell>

      {locationInfo.address && (
        <View className="taroify-ellipsis--l2" style={{ padding: '16px' }}>
          {locationInfo.address}
        </View>
      )}
    </View>
  );
}
