import { useState } from 'react';
import { Field, Input } from '@taroify/core';
import { BaseEventOrig } from '@tarojs/components';

interface PersonProps {
  value: string;
  onChange?: (name: string, value: string) => void;
}

/**
 * 联系人
 * @param props
 * @returns
 */
export default function Person(props: PersonProps) {
  const [inputValue, setInputValue] = useState<string>(props.value || '');

  const handleChange = (event: BaseEventOrig<{ value: string }>) => {
    const newValue = event.detail.value; // 使用 Taro 的 detail 字段获取值
    setInputValue(newValue);
    props.onChange?.('person', newValue);
  };

  return (
    <Field name="person" rules={[{ required: true, message: '请填写用户名' }]}>
      <Input value={inputValue} onChange={handleChange} placeholder="请填写用户名"></Input>
    </Field>
  );
}
