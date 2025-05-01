import React from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

interface ScoreCardProps {
  score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  return (
    <View className="score-card">
      <Text className="label">积分</Text>
      <Text className="value">{score}</Text>
    </View>
  );
};

export default ScoreCard;
