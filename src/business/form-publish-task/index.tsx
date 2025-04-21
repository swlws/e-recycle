import { Cell, Form } from '@taroify/core';
import { View } from '@tarojs/components';
import { useState } from 'react';
import { ITaskInfo } from '@/typings/task';
import Person from './components/person/index';
import Location from './components/location/index';
import Snapshot from './components/snapshot/index';
import PhoneNumber from './components/phone-number/index';
import Goods from './components/goods';
import Remark from './components/remark';
import PickupTime from './components/pickup-time';

interface BeFormPublishTaskProps {
  formValue?: Partial<ITaskInfo>;
  onChange?: (value: Record<string, any>) => void;
  readonly?: boolean;
  children?: React.ReactNode;
}

export default function BeFormPublishTask(props: BeFormPublishTaskProps) {
  const [formValue, setFormValue] = useState<ITaskInfo>(() => {
    return (props.formValue || {}) as ITaskInfo;
  });

  const handleChange = (key: string, value: any) => {
    setFormValue((oldValue) => {
      const newValue = { ...oldValue, [key]: value };
      props.onChange && props.onChange(newValue);
      return newValue;
    });
  };

  return (
    <View className="be-form-publish-task">
      <Form values={formValue}>
        <Cell.Group inset style={{ marginTop: '16px' }}>
          {/* 定位 */}
          <Location
            value={formValue.location}
            readonly={props.readonly}
            onChange={handleChange}
          ></Location>
        </Cell.Group>

        <Cell.Group inset style={{ marginTop: '16px' }}>
          {/* 名称 */}
          <Person
            value={formValue.person}
            readonly={props.readonly}
            onChange={handleChange}
          ></Person>

          {/* 手机号 */}
          <PhoneNumber
            value={formValue.phoneNumber}
            readonly={props.readonly}
            onChange={handleChange}
          ></PhoneNumber>

          {/* 时间 */}
          <PickupTime
            value={formValue.pickupTime}
            readonly={props.readonly}
            onChange={handleChange}
          ></PickupTime>
        </Cell.Group>

        <Cell.Group inset style={{ marginTop: '16px' }}>
          <Goods value={formValue.goods} readonly={props.readonly} onChange={handleChange}></Goods>
        </Cell.Group>

        {props.readonly && formValue.snapshot?.length > 0 && (
          <Cell.Group inset style={{ marginTop: '16px' }}>
            <Snapshot
              value={formValue.snapshot}
              readonly={props.readonly}
              onChange={handleChange}
            ></Snapshot>
          </Cell.Group>
        )}

        <Cell.Group inset style={{ marginTop: '16px' }}>
          <Remark
            value={formValue.remark}
            readonly={props.readonly}
            onChange={handleChange}
          ></Remark>
        </Cell.Group>

        {/* 自定义内容  */}
        {props.children}
      </Form>
    </View>
  );
}
