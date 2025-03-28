import { View } from "@tarojs/components";
import ChildPageLayout from "@/layout/child-page-layout";
import LoginForm from "./components/login-form";

export default function ChildPage() {
  return (
    <ChildPageLayout>
      <View>测试页面</View>

      <LoginForm />
    </ChildPageLayout>
  );
}
