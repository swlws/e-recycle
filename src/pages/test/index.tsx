import { View } from "@tarojs/components";
import ChildPageLayout from "@/layout/child-page-layout";
import BeFormPublishTask from "@/business/form-publish-task";

import LoginForm from "./components/login-form";

export default function ChildPage() {
  let formValue: Record<string, any> = {};

  const handleFormValueChange = (newFormValue: Record<string, any>) => {
    formValue = newFormValue;
  };

  return (
    <ChildPageLayout>
      <View>测试页面</View>

      <LoginForm />

      <BeFormPublishTask formValue={formValue} />
    </ChildPageLayout>
  );
}
