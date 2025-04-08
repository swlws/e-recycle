import { Button, Cell, Form } from '@taroify/core';
import { BaseEventOrig, FormProps, View } from '@tarojs/components';
import { useState } from 'react';
import PhoneNumber from './components/phone-number';
import { ITaskInfo } from '@/typings/task';
import Person from './components/person';
import Location from './components/location';

interface BeFormPublishTaskProps {
  formValue: ITaskInfo;
  onChange?: (value: Record<string, any>) => void;
}

export default function BeFormPublishTask(props: BeFormPublishTaskProps) {
  const [formValue, setFormValue] = useState(props.formValue || {});

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
  };

  return (
    <View className="be-form-publish-task">
      <Form values={formValue} onSubmit={onSubmit}>
        <Cell.Group inset style={{ marginTop: '16px' }}>
          {/* 定位 */}
          <Location value={formValue.address} onChange={handleChange}></Location>
        </Cell.Group>

        <Cell.Group inset style={{ marginTop: '16px' }}>
          {/* 名称 */}
          <Person value={formValue.person} onChange={handleChange}></Person>

          {/* 手机号 */}
          <PhoneNumber value={formValue.phoneNumber} onChange={handleChange}></PhoneNumber>
        </Cell.Group>

        <Cell.Group inset style={{ marginTop: '16px' }}></Cell.Group>

        <View style={{ margin: '16px' }}>
          <Button shape="round" block color="primary" formType="submit">
            提交
          </Button>
        </View>
      </Form>
    </View>
  );
}
