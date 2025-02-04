// CardList.jsx
import { useState, useEffect } from 'react';
import { ScrollView, View, Text } from '@tarojs/components';
import ProductItem from './product-item';
import './index.scss';

interface Card {
  image: string;
  mainTitle: string;
  subTitle: string;
  time: string;
}
const CardList = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // 模拟请求数据
  const fetchCards = async (pageNum) => {
    console.log('fetchCards', pageNum);

    setLoading(true);
    const newCards = Array.from({ length: 10 }, (_, i) => ({
      image: `https://via.placeholder.com/300x150?text=Image+${page * 10 + i + 1}`,
      mainTitle: `Main Title ${page * 10 + i + 1}`,
      subTitle: `Sub Title ${page * 10 + i + 1}`,
      time: `2025-02-04 12:00:${page * 10 + i}`,
    }));
    setTimeout(() => {
      setCards((prev) => [...prev, ...newCards]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchCards(page);
  }, [page]);

  // 滚动到底部触发分页加载
  const onScrollToLower = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <ScrollView
      className='product-list'
      scrollY
      onScrollToLower={onScrollToLower} // 监听滚动到底部
    >

      <View className='product-container'>
        {cards.map((card, index) => (
          <ProductItem key={index} {...card} />
        ))}
      </View>

      {loading && <View className='loading'><Text>加载中...</Text></View>}
    </ScrollView>
  );
};

export default CardList;
