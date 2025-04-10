import { Avatar, Cell, Flex } from '@taroify/core';
import { View } from '@tarojs/components';

export default function UserInfo() {
  return (
    <Cell>
      <Flex className="user-info" style={{ height: '58px' }}>
        <Avatar src="https://joesch.moe/api/v1/random" size="large"></Avatar>

        <Flex direction="column" justify="center" style={{ height: '100%', marginLeft: '16px' }}>
          <Flex.Item>
            <View>昵称</View>
          </Flex.Item>

          <Flex.Item>
            <View>198 **** 9999</View>
          </Flex.Item>
        </Flex>
      </Flex>
    </Cell>
  );
}
