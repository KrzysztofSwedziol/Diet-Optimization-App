import { ProductWithPreference } from '@/types';
import * as Ui from './ProductsSearchBarItem.styles';

type Props = {
  product: ProductWithPreference;
};

const ProductsSearchBarItem = ({ product }: Props) => {
  const p = product.product;
  const showPreference = product.preference !== 0;

  return (
    <Ui.Container>
      <Ui.HeaderRow>
        <Ui.Name>{p.name}</Ui.Name>

        {showPreference && (
          <Ui.Preference>
            <Ui.FavoriteIcon /> {product.preference}
          </Ui.Preference>
        )}
      </Ui.HeaderRow>

      <Ui.NutritionRow>
        <Ui.NutritionBlock>
          <Ui.NutritionLabel>Kcal</Ui.NutritionLabel>
          <Ui.NutritionValue>{p.kcal100g}</Ui.NutritionValue>
        </Ui.NutritionBlock>

        <Ui.NutritionBlock>
          <Ui.NutritionLabel>Protein</Ui.NutritionLabel>
          <Ui.NutritionValue>{p.protein100g} g</Ui.NutritionValue>
        </Ui.NutritionBlock>

        <Ui.NutritionBlock>
          <Ui.NutritionLabel>Carbs</Ui.NutritionLabel>
          <Ui.NutritionValue>{p.carbs100g} g</Ui.NutritionValue>
        </Ui.NutritionBlock>

        <Ui.NutritionBlock>
          <Ui.NutritionLabel>Fat</Ui.NutritionLabel>
          <Ui.NutritionValue>{p.fat100g} g</Ui.NutritionValue>
        </Ui.NutritionBlock>
      </Ui.NutritionRow>
    </Ui.Container>
  );
};

export default ProductsSearchBarItem;
