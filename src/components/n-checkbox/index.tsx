import  { useState, useEffect } from 'react';
import { Checkbox } from '@taroify/core';

type CheckboxValueType = string | number | boolean ;

interface CheckboxOption {
  label: string;
  value:CheckboxValueType;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  defaultValue?: CheckboxValueType[];
  onChange?: (values: CheckboxValueType[]) => void;
}

export default function NCheckboxGroup({
  options,
  defaultValue = [],
  onChange,
}: CheckboxGroupProps) {
  const [selectedValues, setSelectedValues] = useState(defaultValue);

  useEffect(() => {
    setSelectedValues(defaultValue);
  }, [defaultValue]);

  const handleChange = (value: CheckboxValueType) => {
    const isChecked = selectedValues.includes(value);
    let newValues;
    if (isChecked) {
      newValues = selectedValues.filter(v => v!== value);
    } else {
      newValues = [...selectedValues, value];
    }
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  return (
    <>
      {options.map((option) => (
        <Checkbox
          key={''+option.value}
          shape='square'
          checked={selectedValues.includes(option.value)}
          onChange={() => handleChange(option.value)}
        >
          {option.label}
        </Checkbox>
      ))}
    </>
  );
}
