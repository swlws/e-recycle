import { Button, Form } from '@taroify/core';
import { View } from '@tarojs/components';
import { useRef, useState } from 'react';
import TaskName from './components/task-name';
import PhoneNumber from './components/phone-number';

// Define the type for the Form instance
interface FormInstance {
  validate: () => Promise<any>;
  getValues: () => Record<string, any>;
}

interface BeFormPublishTaskProps {
  formValue: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
}

export default function BeFormPublishTask(props: BeFormPublishTaskProps) {
  const formRef = useRef<FormInstance>();
  const [formValue, setFormValue] = useState(props.formValue || {});

  const handleChange = (key: string, value: any) => {
    setFormValue({
      ...formValue,
      [key]: value,
    });

    if (props.onChange) {
      props.onChange({
        ...formValue,
        [key]: value,
      });
    }
  };

  const submit = () => {
    console.log('提交表单', formValue, formRef.current);
    formRef.current?.validate().then((r) => {
      console.log('表单验证结果', r);
      console.log('表单值', formRef.current?.getValues());
    });
  };

  return (
    <View>
      <Form ref={formRef}>
        <TaskName value={formValue.taskName} onChange={handleChange}></TaskName>

        <PhoneNumber value={formValue.phoneNumber} onChange={handleChange}></PhoneNumber>
      </Form>

      <Button shape="round" block color="primary" formType="submit" onClick={submit}>
        提交
      </Button>
    </View>
  );
}
