import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';
import { LocationOutlined } from '@taroify/icons';
import { chooseLocation, openLocation } from '@/bridge/location';
import { useState } from 'react';
import { IChooseLocation } from '@/typings/bridge';
import CacheMgr from '@/cache/index';

import './index.scss';

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
    const value = props.value || (CacheMgr.chooseLocation.value as IChooseLocation);

    props.onChange && props.onChange('location', value);

    return value;
  });

  const handleClickEvent = () => {
    if (props.readonly) {
      openMap();
      return;
    }

    chooseLocation().then((res) => {
      // 组件状态
      setLocationInfo(res);
      // 缓存状态
      CacheMgr.chooseLocation.setValue(res);
      // 表单状态
      props.onChange && props.onChange('location', res);
    });
  };

  const openMap = () => {
    openLocation(locationInfo);
  };

  return (
    <View className={`be-form-publish-task-address ${props.readonly ? 'readonly' : ''}`}>
      <Cell
        rightIcon={<LocationOutlined size={20} />}
        title={locationInfo.name || '点击选择地址'}
        isLink
        clickable
        onClick={handleClickEvent}
      ></Cell>

      {locationInfo.address && (
        <View className="taroify-ellipsis--l2" style={{ padding: '16px' }} onClick={openMap}>
          {locationInfo.address}
        </View>
      )}
    </View>
  );
}
