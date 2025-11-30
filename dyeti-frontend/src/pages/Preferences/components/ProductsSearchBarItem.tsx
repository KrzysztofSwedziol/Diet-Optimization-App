import { ProductWithPreference } from '@/types';
import * as Ui from './ProductsSearchBarItem.styles';
import NutritionInfo from './NutritionInfo';

type Props = {
  product: ProductWithPreference;
  onClick: () => void;
};

const ProductsSearchBarItem = ({ product: productWithPreference, onClick }: Props) => {
  const { product, preference } = productWithPreference;
  const showPreference = productWithPreference.preference !== 0;

  return (
    <Ui.Container onClick={onClick}>
      <Ui.HeaderRow>
        <Ui.Name>{product.name}</Ui.Name>

        {showPreference && (
          <Ui.Preference>
            <Ui.FavoriteIcon /> {preference}
          </Ui.Preference>
        )}
      </Ui.HeaderRow>
      <Ui.NutritionDescription>Nutrition (per 100g):</Ui.NutritionDescription>
      <Ui.NutritionInfoContainer>
        <NutritionInfo
          kcal={product.kcal100g}
          protein={product.protein100g}
          carbs={product.carbs100g}
          fat={product.fat100g}
        />
      </Ui.NutritionInfoContainer>
    </Ui.Container>
  );
};

export default ProductsSearchBarItem;
