import { View, Text } from '@tarojs/components';

import './index.scss';
import { IScoreItem } from '@/typings/user';
import { ENUM_SCORE_SOURCE_TYPE, SCORE_SOURCE_CHINESE_NAME_MAP } from '@/constants/public';

interface ScoreItemProps {
  info: IScoreItem;
}

/**
 * 积分明细列表项
 * @param param0
 * @returns
 */
const ScoreItem: React.FC<ScoreItemProps> = ({ info }) => {
  const { type, createTime, score = 0 } = info;
  const typeStr = SCORE_SOURCE_CHINESE_NAME_MAP[type] || '未知';
  let description = '';
  if (type === ENUM_SCORE_SOURCE_TYPE.INVITE) {
    const invitedPerson = info.payload?.nickName;
    description = invitedPerson ? `邀请好友【${invitedPerson}】注册` : '邀请好友成功';
  }

  return (
    <View className="score-item">
      <View className="score-info">
        <Text className="score-type">{typeStr}</Text>
        <Text className="score-time">{createTime}</Text>
        {description && <Text className="score-description">{description}</Text>}
      </View>
      <View className="score-value">
        <Text className={score >= 0 ? 'positive' : 'negative'}>
          {score >= 0 ? '+' : ''}
          {score + '分'}
        </Text>
      </View>
    </View>
  );
};

export default ScoreItem;
