import { ITaskInfo } from '@/typings/task';
import { Avatar, Cell, Flex } from '@taroify/core';

import './index.scss';

interface NCardProps {
  index?: number;
  info?: ITaskInfo;
  onClick?: () => void;
}

export default function NCard(props: NCardProps) {
  let snapshotUrl = props.info?.snapshot?.[0]?.url;
  if (!snapshotUrl) {
    snapshotUrl = 'https://robohash.org/e-';
  }

  return (
    <Cell className="n-card-container" onClick={props.onClick}>
      <Flex className="n-card" style={{ height: '58px' }}>
        <Flex.Item>
          <Avatar src={snapshotUrl} shape="rounded" size="large" />
        </Flex.Item>

        <Flex.Item offset={1} style={{ height: '100%', minWidth: '1px', flex: 1 }}>
          <Flex direction="column" justify="center" style={{ height: '100%', minWidth: '1px' }}>
            <Flex.Item style={{ fontWeight: 'bolder' }}>{props.info?.pickupTime}</Flex.Item>
            <Flex.Item>{props.info?.location?.name}</Flex.Item>
            <Flex.Item>{props.info?.goods?.join('、')}kmk amckam dkcaj nscdj sncdjn</Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </Cell>
  );
}
