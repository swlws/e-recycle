import NInput from '@/components/n-input';
import { Field } from '@taroify/core';

interface PhoneNumberProps {
  value?: string;
  onChange?: (name: string, value: any) => void;
}

export default function PhoneNumber({ value = '', onChange }: PhoneNumberProps) {
  const handleInputChange = (newValue: string) => {
    onChange?.('phoneNumber', newValue);
  };

  return (
    <Field name="phoneNumber">
      <NInput value={value} placeholder="手机号码" onChange={handleInputChange} />
    </Field>
  );
}
