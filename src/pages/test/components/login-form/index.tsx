import { Button, Cell, Field, Form, Input, Toast } from "@taroify/core";
import { FormProps, View } from "@tarojs/components";
import { BaseEventOrig } from "@tarojs/components/types/common";
import NCheckboxGroup from "@/components/n-checkbox";

export default function LoginForm() {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    Toast.open(JSON.stringify(event.detail.value));
  };


  const options = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' },
  ];

  return (
    <Form onSubmit={onSubmit}>
      <Toast id='toast' />
      <Cell.Group inset>
        <Field
          label='用户名'
          name='username'
          rules={[{ required: true, message: "请填写用户名" }]}
        >
          <Input placeholder='用户名' />
        </Field>
        <Field
          label='密码'
          name='password'
          rules={[{ required: true, message: "请填写密码" }]}
        >
          <Input password placeholder='密码' />
        </Field>
        <Field>
          <NCheckboxGroup options={options} />
        </Field>
      </Cell.Group>
      <View style={{ margin: "16px" }}>
        <Button shape='round' block color='primary' formType='submit'>
          提交
        </Button>
      </View>
    </Form>
  );
}
