import React from 'react';
import { AtInput } from 'taro-ui';

// 定义支持的 input 类型
type InputType = 'number' | 'text' | 'password' | 'phone' | 'idcard' | 'digit';

type EInputProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: InputType; // 使用类型别名进行类型约束
  maxLength?: number;
  disabled?: boolean;
  customStyle?: React.CSSProperties;
}
const EInput = ({
  value,
  onChange,
  placeholder = '请输入内容',
  type = 'text',
  maxLength = 140,
  disabled = false,
  customStyle = {},
}: EInputProps) => {
  return (
    <AtInput
      name='custom-input'
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      style={customStyle}
    />
  );
};

export default EInput;
