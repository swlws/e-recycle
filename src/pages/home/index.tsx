import { gotoPage } from "@/taro-api/router";
import { Button } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { ENUM_ROUTE_PATH } from "@/constants/route";

export default function Mine() {
  const handleClick = () => {
    gotoPage(ENUM_ROUTE_PATH.ChildPage);
  };

  return (
    <View>
      <Text>Home</Text>

      <Button onClick={handleClick}>跳转子页面</Button>
    </View>
  );
}
