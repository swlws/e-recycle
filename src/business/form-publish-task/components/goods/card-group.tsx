import { View, Image } from '@tarojs/components';
import { Checked } from '@taroify/icons';
import './card-group.scss';

interface CardProps {
  image: string;
  text: string;
  selected?: boolean;
}

interface CardGroupProps {
  value: string[];
  cards: CardProps[];
  onChange?: (name: string[]) => void;
}

export default function CardGroup({ value, cards, onChange }: CardGroupProps) {
  const handleChange = (name: string) => {
    if (value.includes(name)) {
      const list = value.filter((item) => item !== name);
      onChange?.(list);
    } else {
      const list = [...value, name];
      onChange?.(list);
    }
  };
  return (
    <View className="card-group">
      {cards.map((card, index) => (
        <View
          key={index}
          className={`card-group__item ${
            value.includes(card.text) ? 'card-group__item--selected' : ''
          }`}
          onClick={() => handleChange(card.text)}
        >
          <View className="card-group__item-image">
            <Image src={card.image} mode="aspectFill" />
            {value.includes(card.text) && (
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
