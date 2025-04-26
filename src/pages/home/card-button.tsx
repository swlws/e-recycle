import { View, Image } from '@tarojs/components';
import './card-button.scss';

interface CardButtonProps {
  image: string;
  text: string;
  onClick?: () => void;
}

export default function CardButton({ image, text, onClick }: CardButtonProps) {
  return (
    <View className="card-button" onClick={onClick}>
      <View className="card-button__image">
        <Image src={image} mode="aspectFit" />
      </View>
      <View className="card-button__text">{text}</View>
    </View>
  );
}
