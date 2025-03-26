import React from 'react';
import { AtInput } from 'taro-ui';

const NInput = ({ defaultValue = '', onChange }) => {
    const [value, setValue] = React.useState(defaultValue);
  
    const handleChange = (val) => {
      setValue(val);
      if (onChange) {
        onChange(val);
      }
    };
  
    return (
      <AtInput
        value={value}
        onChange={handleChange}
        placeholder="请输入文本"
      />
    );
};


export default NInput;

