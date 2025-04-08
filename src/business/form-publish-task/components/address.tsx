import NInput from '@/components/n-input';
import { Field } from '@taroify/core';

interface AddressProps {
  value: string;
  onChange?: (name: string, value: string) => void;
}

/**
 * 地址
 * @param props
 * @returns
 */
export default function Address(props: AddressProps) {
  return (
    <Field name="address">
      <NInput
        value={props.value}
        onChange={(value) => props.onChange?.('address', value)}
        placeholder="地址"
      ></NInput>
    </Field>
  );
}
