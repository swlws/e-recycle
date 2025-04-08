import { Button, Cell, Form } from '@taroify/core';
import { BaseEventOrig, FormProps, View } from '@tarojs/components';
import { useState } from 'react';
import PhoneNumber from './components/phone-number';
import { ITaskInfo } from '@/typings/task';
import Person from './components/person';
import Address from './components/address';

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
        <Cell.Group inset>
          {/* 名称 */}
          <Person value={formValue.person} onChange={handleChange}></Person>

          {/* 手机号 */}
          <PhoneNumber value={formValue.phoneNumber} onChange={handleChange}></PhoneNumber>

          {/* 地址 */}
          <Address value={formValue.address} onChange={handleChange}></Address>
        </Cell.Group>

        <View style={{ margin: '16px' }}>
          <Button shape="round" block color="primary" formType="submit">
            提交
          </Button>
        </View>
      </Form>
    </View>
  );
}
