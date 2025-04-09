import { Field, Input } from '@taroify/core';
import NumberKeyboardWithKeys from './number-keyboard-with-keys';
import { useRef } from 'react';

interface PhoneNumberProps {
  value?: string;
  onChange?: (name: string, value: any) => void;
}

export default function PhoneNumber({ value = '', onChange }: PhoneNumberProps) {
  const numberKeyboardRef = useRef<any>(null);

  const openNumberKeyboard = () => {
    numberKeyboardRef.current?.show?.();
  };

  const handleKeyPress = (key: string) => {
    let newValue = '' + value;
    if (typeof key === 'number') {
      newValue += '' + key;
    } else if (!key) {
      newValue = newValue.slice(0, -1);
    }
    onChange?.('phoneNumber', newValue);
  };

  return (
    <Field name="phoneNumber">
      <Input value={value} placeholder="手机号码" readonly onClick={openNumberKeyboard}></Input>

      <NumberKeyboardWithKeys
        ref={numberKeyboardRef}
        onKeyPress={handleKeyPress}
      ></NumberKeyboardWithKeys>
    </Field>
  );
}
