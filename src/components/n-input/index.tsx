import { useState, useEffect } from "react";
import { Input } from "@taroify/core";
import { BaseEventOrig } from "@tarojs/components/types/common";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function NInput({ value, onChange, placeholder }: InputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event: BaseEventOrig<{ value: string }>) => {
    const newValue = event.detail.value; // 使用 Taro 的 detail 字段获取值
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <Input
      value={inputValue}
      placeholder={placeholder}
      onChange={handleChange}
    ></Input>
  );
}
