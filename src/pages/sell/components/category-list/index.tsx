import React from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";

interface Card {
  id: string;
  title: string;
  description: string;
}

interface CategoryListProps {
  cards: Card[];
}

const CategoryList: React.FC<CategoryListProps> = ({ cards }) => {
  return (
    <View className='category-list'>
      {cards.map((item, index) => (
        <View key={index} className='category-item'>
          <View className='title'>{item.title}</View>
          <View className='sub-title'>{item.description}</View>
        </View>
      ))}
    </View>
  );
};

export default CategoryList;
