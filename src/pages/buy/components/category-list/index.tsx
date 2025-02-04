import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

interface Card {
  name: string;
  id: string;
}

interface CategoryListProps {
  cards: Card[];
}

const CategoryList: React.FC<CategoryListProps> = ({ cards }) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null); // 选中卡片的id

  const handleCardClick = (id: string) => {
    if (selectedCardId === id) {
      setSelectedCardId(null); // 如果点击的是已经选中的卡片，则取消选中
    } else {
      setSelectedCardId(id); // 否则选中该卡片
    }
  };

  const rows: Card[][] = []; // 显式定义 rows 的类型为 Card[][]

  // 分配卡片到每一行
  for (let i = 0; i < cards.length; i += 3) {
    rows.push(cards.slice(i, i + 3));
  }

  return (
    <View className='category-list'>
      {rows.map((row, rowIndex) => ( // 修改此处，使用 rows 而不是 cards
        <View className='category-row' key={rowIndex}>
          {row.map((card) => (
            <View
              className={`category ${selectedCardId === card.id ? 'selected' : ''}`}
              key={card.id}
              onClick={() => handleCardClick(card.id)}
            >
              <Text className='category-name'>{card.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CategoryList;
