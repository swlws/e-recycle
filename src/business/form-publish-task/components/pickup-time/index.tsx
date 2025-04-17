import { Cell, Picker, Popup } from '@taroify/core';
import { View } from '@tarojs/components';
import { useState } from 'react';
import { getPickerOption } from './helper';

interface PickupTimeProps {
  value?: string;
  onChange?: (name: string, value: string) => void;
  readonly?: boolean;
}

export default function PickupTime(props: PickupTimeProps) {
  const [pickupTime, setPickupTime] = useState(props.value || '');
  const [visible, setVisible] = useState(false);
  const openModel = () => {
    if (props.readonly) return;

    setVisible(true);
  };

  const confirmPicker = (value: string[]) => {
    setVisible(false);

    const newTime = value.join(' ');
    setPickupTime(newTime);
    props.onChange && props.onChange('pickupTime', newTime);
  };

  return (
    <View>
      <Cell title={pickupTime || '时间'} isLink clickable onClick={openModel}></Cell>

      <Popup
        open={visible}
        placement="bottom"
        rounded
        style={{ height: '50%' }}
        onClose={() => setVisible(false)}
      >
        <Picker
          title="时间"
          columns={getPickerOption()}
          onConfirm={confirmPicker}
          onCancel={() => setVisible(false)}
        ></Picker>
      </Popup>
    </View>
  );
}
