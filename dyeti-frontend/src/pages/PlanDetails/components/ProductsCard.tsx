import { PlanProduct } from '@/types';
import * as Ui from './ProductsCard.styles';
import ProductsList from './ProductsList';

type Props = {
  products: PlanProduct[];
};

const ProductsCard = ({ products }: Props) => {
  return (
    <Ui.Container>
      <ProductsList products={products} />
    </Ui.Container>
  );
};

export default ProductsCard;
