import NutritionInfo from './NutritionInfo';
import * as Ui from './ProductPreferenceCard.styles';
import { ProductWithPreference } from '@/types';

type Props = {
  item: ProductWithPreference;
  onClick: (item: ProductWithPreference) => void;
};

const ProductPreferenceCard = ({ item, onClick }: Props) => {
  const { product, preference } = item;

  return (
    <Ui.Card onClick={() => onClick(item)}>
      <Ui.Header>
        <Ui.Name>{product.name}</Ui.Name>
        <Ui.Preference>
          <Ui.FavoriteIcon /> {preference}
        </Ui.Preference>
      </Ui.Header>

      <Ui.NutritionDescription>Nutrition (per 100g):</Ui.NutritionDescription>

      <NutritionInfo
        kcal={product.kcal100g}
        protein={product.protein100g}
        carbs={product.carbs100g}
        fat={product.fat100g}
      />
    </Ui.Card>
  );
};

export default ProductPreferenceCard;
