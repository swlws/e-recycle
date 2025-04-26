import { View, Image } from '@tarojs/components';
import { Checked } from '@taroify/icons';
import './card-group.scss';

interface CardProps {
  image: string;
  text: string;
  selected?: boolean;
}

interface CardGroupProps {
  cards: CardProps[];
  onChange?: (index: number) => void;
}

export default function CardGroup({ cards, onChange }: CardGroupProps) {
  return (
    <View className="card-group">
      {cards.map((card, index) => (
        <View
          key={index}
          className={`card-group__item ${card.selected ? 'card-group__item--selected' : ''}`}
          onClick={() => onChange?.(index)}
        >
          <View className="card-group__item-image">
            <Image src={card.image} mode="aspectFill" />
            {card.selected && (
              <View className="card-group__item-check">
                <Checked color="#07c160" size="20" />
              </View>
            )}
          </View>
          <View className="card-group__item-text">{card.text}</View>
        </View>
      ))}
    </View>
  );
}
