// CardItem.jsx
import { View, Image, Text } from '@tarojs/components';
import './product-item.scss';

const ProductItem = ({ image, mainTitle, subTitle, time }) => {
  return (
    <View className='product'>
      <View className='product-image'>
        <Image src={image} mode='aspectFill' className='image' />
      </View>

      <View className='product-text'>
        <Text className='main-title'>{mainTitle}</Text>
        <Text className='sub-title'>{subTitle}</Text>
        <Text className='time'>{time}</Text>
      </View>
    </View>
  );
};

export default ProductItem;
