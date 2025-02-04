import React from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

interface Card {
  name: string;
  id: string;
}

interface CardListProps {
  cards: Card[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const rows: Card[][] = []; // 显式定义 rows 的类型为 Card[][]

  // 分配卡片到每一行
  for (let i = 0; i < cards.length; i += 3) {
    rows.push(cards.slice(i, i + 3));
  }

  return (
    <View className='card-list'>
      {rows.map((row, rowIndex) => ( // 修改此处，使用 rows 而不是 cards
        <View className='card-row' key={rowIndex}>
          {row.map((card) => (
            <View className='card' key={card.id}>
              <Text className='card-name'>{card.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CardList;
