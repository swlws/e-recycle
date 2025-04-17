import { Button, Cell, Form } from '@taroify/core';
import { BaseEventOrig, FormProps, View } from '@tarojs/components';
import { useState } from 'react';
import { ITaskInfo } from '@/typings/task';
import Person from './components/person/index';
import Location from './components/location/index';
import Snapshot from './components/snapshot/index';
import PhoneNumber from './components/phone-number/index';
import Goods from './components/goods';
import Remark from './components/remark';
import PickupTime from './components/pickup-time';
import api from '@/api';

interface BeFormPublishTaskProps {
  formValue?: ITaskInfo;
  onChange?: (value: Record<string, any>) => void;
  readonly?: boolean;
}

export default function BeFormPublishTask(props: BeFormPublishTaskProps) {
  const [formValue, setFormValue] = useState<ITaskInfo>(() => {
    return props.formValue || ({} as ITaskInfo);
  });

  const handleChange = (key: string, value: any) => {
    setFormValue({
      ...formValue,
      [key]: value,
    });

    if (props.onChange) {
      props.onChange({
        ...formValue,
        [key]: value,
      });
    }
  };

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    console.log(JSON.stringify(event.detail.value));
    api.task.postTask();
  };

  return (
    <View className="be-form-publish-task">
      <Form values={formValue} onSubmit={onSubmit}>
        <Cell.Group inset style={{ marginTop: '16px' }}>
          {/* 定位 */}
          <Location
            value={formValue.address}
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

        <Cell.Group inset style={{ marginTop: '16px' }}>
          <Snapshot readonly={props.readonly}></Snapshot>
        </Cell.Group>

        <Cell.Group inset style={{ marginTop: '16px' }}>
          <Remark
            value={formValue.remark}
            readonly={props.readonly}
            onChange={handleChange}
          ></Remark>
        </Cell.Group>

        {!props.readonly && (
          <View style={{ margin: '16px' }}>
            <Button shape="round" block color="primary" formType="submit">
              提交
            </Button>
          </View>
        )}
      </Form>

      <View>{JSON.stringify(formValue)}</View>
    </View>
  );
}
