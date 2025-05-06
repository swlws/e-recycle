import { ITaskInfo } from '@/typings/task';
import { Avatar, Cell, Flex, Space } from '@taroify/core';
import { ClockOutlined, Location, ShoppingCart } from '@taroify/icons';

import './index.scss';
import { formatRelativeDate } from '@/utils/date';
import { View } from '@tarojs/components';
import { TASK_STATE_MAP_ZH_CN } from '@/constants/public';

interface NCardProps {
  index?: number;
  info?: ITaskInfo;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function NCard(props: NCardProps) {
  let snapshotUrl = props.info?.snapshot?.[0]?.url;
  if (!snapshotUrl) {
    snapshotUrl = 'https://robohash.org/e-';
  }

  const state = props.info?.state || '';
  const stateZh = state ? TASK_STATE_MAP_ZH_CN[state] : '';

  return (
    <Cell className="n-card-container" onClick={props.onClick}>
      <Flex className="n-card" style={{ height: '58px' }}>
        <Flex.Item>
          <Avatar src={snapshotUrl} shape="rounded" size="large" />
        </Flex.Item>

        <Flex.Item offset={1} style={{ height: '100%', minWidth: '1px', flex: 1 }}>
          <Flex direction="column" justify="center" style={{ height: '100%', minWidth: '1px' }}>
            <Flex.Item style={{ fontWeight: 'bolder' }}>
              <ClockOutlined size={16} />
              {formatRelativeDate(props.info?.pickupTime || '')}
            </Flex.Item>
            <Flex.Item style={{ color: '#009afe' }}>
              <Location size={16} />
              {props.info?.location?.name}
            </Flex.Item>
            <Flex.Item style={{ color: 'orange' }}>
              <ShoppingCart size={16} />
              {props.info?.goods?.join('、')}
            </Flex.Item>
          </Flex>
        </Flex.Item>

        <Flex.Item>
          <View className={`n-card-state ${state}`}>{stateZh}</View>
        </Flex.Item>
      </Flex>

      {props.children}
    </Cell>
  );
}
