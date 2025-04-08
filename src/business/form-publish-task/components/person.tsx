import NInput from '@/components/n-input';
import { Field } from '@taroify/core';

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
  return (
    <Field name="person" rules={[{ required: true, message: '请填写用户名' }]}>
      <NInput
        value={props.value}
        onChange={(value) => props.onChange?.('person', value)}
        placeholder="联系人"
      ></NInput>
    </Field>
  );
}
