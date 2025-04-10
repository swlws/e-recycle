import { Cell } from '@taroify/core';
import { View } from '@tarojs/components';
import { LocationOutlined } from '@taroify/icons';
import { chooseLocation } from '@/bridge/location';
import { useState } from 'react';
import { IChooseLocation } from '@/typings/bridge';

interface LocationProps {
  value: IChooseLocation;
  onChange?: (name: string, value: IChooseLocation) => void;
}

/**
 * 地址
 * @param props
 * @returns
 */
export default function Location(props: LocationProps) {
  const [locationInfo, setLocationInfo] = useState(() => {
    return props.value || ({} as IChooseLocation);
  });

  const handleClickEvent = () => {
    chooseLocation().then((res) => {
      setLocationInfo(res);
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
