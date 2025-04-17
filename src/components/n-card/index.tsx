import { Avatar, Cell, Flex } from '@taroify/core';

interface NCardProps {
  onClick?: () => void;
}

export default function NCard(props: NCardProps) {
  return (
    <Cell onClick={props.onClick}>
      <Flex className="n-card" style={{ height: '58px' }}>
        <Flex.Item>
          <Avatar src="https://joesch.moe/api/v1/random" shape="rounded" size="large" />
        </Flex.Item>

        <Flex.Item offset={1} style={{ height: '100%' }}>
          <Flex direction="column" justify="center" style={{ height: '100%' }}>
            <Flex.Item>主标题</Flex.Item>
            <Flex.Item>副标题</Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </Cell>
  );
}
