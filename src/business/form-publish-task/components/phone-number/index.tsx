import { Button, Field, Input } from '@taroify/core';
import NumberKeyboardWithKeys from './number-keyboard-with-keys';
import { useRef } from 'react';
import { phoneNumberFormatter } from '@/utils/tool';
import { Phone } from '@taroify/icons';
import Taro from '@tarojs/taro';

interface PhoneNumberProps {
  value?: string;
  onChange?: (name: string, value: any) => void;
  readonly?: boolean;
  showCallButton?: boolean; // 新增参数，控制是否显示拨打电话按钮
}

export default function PhoneNumber({
  value = '',
  readonly,
  onChange,
  showCallButton = false, // 默认为 false
}: PhoneNumberProps) {
  const numberKeyboardRef = useRef<any>(null);

  const openNumberKeyboard = () => {
    if (readonly) return;

    // 禁止编辑
    // numberKeyboardRef.current?.show?.();
  };

  const handleKeyPress = (key: string) => {
    if (readonly) return;

    let newValue = '' + value;
    if (typeof key === 'number') {
      newValue += '' + key;
    } else if (!key) {
      newValue = newValue.slice(0, -1);
    }
    onChange?.('phoneNumber', newValue);
  };

  const handleCall = () => {
    if (!value) return;
    Taro.makePhoneCall({
      phoneNumber: value,
    });
  };

  return (
    <Field name="phoneNumber">
      <Input
        value={readonly && value ? phoneNumberFormatter(value, true) : phoneNumberFormatter(value)}
        placeholder="手机号码"
        readonly
        onClick={openNumberKeyboard}
      ></Input>

      {readonly && value && showCallButton && (
        <Button
          variant="contained"
          color="primary"
          shape="round"
          size="small"
          icon={<Phone size="14" />}
          onClick={handleCall}
          style={{ marginLeft: '8px', marginRight: '12px', height: '24px', padding: '0 12px' }}
        >
          拨打电话
        </Button>
      )}

      <NumberKeyboardWithKeys
        ref={numberKeyboardRef}
        onKeyPress={handleKeyPress}
      ></NumberKeyboardWithKeys>
    </Field>
  );
}
