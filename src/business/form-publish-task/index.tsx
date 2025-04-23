import { Cell, Form } from '@taroify/core';
import { View } from '@tarojs/components';
import { useState } from 'react';
import CacheMgr from '@/cache';
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

  // 当前用户 ID
  const uid = CacheMgr.user.value?._id;

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
          {props.readonly && <Cell title="卖方信息"></Cell>}

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
            showCallButton={uid === formValue.dealWithUid}
          ></PhoneNumber>
        </Cell.Group>

        {props.readonly && formValue.dealWithUid && (
          <Cell.Group inset style={{ marginTop: '16px' }}>
            {props.readonly && <Cell title="买方信息"></Cell>}

            {/* 名称 */}
            <Person
              value={formValue.dealwithPerson}
              readonly={props.readonly}
              onChange={handleChange}
            ></Person>

            {/* 手机号 */}
            <PhoneNumber
              value={formValue.dealWithPhoneNumber}
              readonly={props.readonly}
              onChange={handleChange}
              showCallButton={uid === formValue.uid}
            ></PhoneNumber>
          </Cell.Group>
        )}

        <Cell.Group inset style={{ marginTop: '16px' }}>
          <Cell title="物品"></Cell>

          {/* 时间 */}
          <PickupTime
            value={formValue.pickupTime}
            readonly={props.readonly}
            onChange={handleChange}
          ></PickupTime>

          {/* 物品 */}
          <Goods value={formValue.goods} readonly={props.readonly} onChange={handleChange}></Goods>
        </Cell.Group>

        {!(props.readonly && !formValue.snapshot?.length) && (
          <Cell.Group inset style={{ marginTop: '16px' }}>
            <Snapshot
              value={formValue.snapshot}
              readonly={props.readonly}
              onChange={handleChange}
            ></Snapshot>
          </Cell.Group>
        )}

        {!(props.readonly && !formValue.remark?.length) && (
          <Cell.Group inset style={{ marginTop: '16px' }}>
            <Remark
              value={formValue.remark}
              readonly={props.readonly}
              onChange={handleChange}
            ></Remark>
          </Cell.Group>
        )}

        {/* 自定义内容  */}
        {props.children}
      </Form>
    </View>
  );
}
