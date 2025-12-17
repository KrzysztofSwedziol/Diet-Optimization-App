import { Product } from '@/types';
import * as Ui from './ProductEntry.styles';
import { formatNumber } from '../utils/formatNumber';
import { calculateNutrients } from '../utils/calculateNutrients';

type Props = {
  product: Product;
  quantity: number;
};

const ProductEntry = ({ product, quantity }: Props) => {
  const { calories } = calculateNutrients(product, quantity);

  return (
    <Ui.Row>
      <Ui.Name>{product.name}</Ui.Name>
      <Ui.Details>
        <Ui.Quantity>
          {formatNumber(quantity)} {product.unit.symbol}
        </Ui.Quantity>
        <Ui.Calories>({formatNumber(calories)} kcal)</Ui.Calories>
      </Ui.Details>
    </Ui.Row>
  );
};

export default ProductEntry;
