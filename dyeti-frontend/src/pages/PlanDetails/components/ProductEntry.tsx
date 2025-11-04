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
    <Ui.Container>
      <Ui.ProductName to={`/products/${product.id}`}>{product.name}</Ui.ProductName>
      <Ui.Details>
        <Ui.Quantity>
          {formatNumber(quantity)} {product.unit.symbol}
        </Ui.Quantity>
        <Ui.Calories>&#40;{formatNumber(calories)} kcal&#41;</Ui.Calories>
      </Ui.Details>
    </Ui.Container>
  );
};

export default ProductEntry;
