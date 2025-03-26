import React from 'react';
import NInput from '../n-input';

const NForm = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({});

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>c
      <NInput
        defaultValue="" 
        onChange={(val) => handleInputChange('inputValue', val)}
      />
      <button type="submit">提交</button>
    </form>
  );
};

export default NForm;