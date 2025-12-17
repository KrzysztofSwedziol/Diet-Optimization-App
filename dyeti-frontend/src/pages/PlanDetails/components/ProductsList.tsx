import { MealProduct, PlanProduct } from '@/types';
import * as Ui from './ProductsList.styles';
import ProductEntry from './ProductEntry';

type Props = {
  products: PlanProduct[] | MealProduct[];
};

const ProductsList = ({ products }: Props) => {
  return (
    <Ui.Container>
      <Ui.ProductsList>
        {products.map(({ product, quantity }) => (
          <Ui.ProductsListItem key={product.id}>
            <ProductEntry product={product} quantity={quantity} />
          </Ui.ProductsListItem>
        ))}
      </Ui.ProductsList>
    </Ui.Container>
  );
};

export default ProductsList;
