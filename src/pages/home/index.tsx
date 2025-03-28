import { gotoPage } from "@/taro-api/router";
import { Button } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { ENUM_ROUTE_PATH } from "@/constants/route";

export default function Mine() {
  const handleClick = (path: ENUM_ROUTE_PATH) => {
    gotoPage(path);
  };

  return (
    <View>
      <Text>Home</Text>

      <Button onClick={() => handleClick(ENUM_ROUTE_PATH.ChildPage)}>跳转子页面</Button>
      <Button onClick={() => handleClick(ENUM_ROUTE_PATH.Test)}>Test 页面</Button>
    </View>
  );
}
