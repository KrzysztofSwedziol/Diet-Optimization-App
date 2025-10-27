import { Product } from '@/types';
import * as Ui from './ProductName.styles';

type Props = {
  product: Product;
};

const ProductName = ({ product }: Props) => (
  <Ui.Container>
    <Ui.ProductNavLink to={`/products/${product.id}`}>{product.name}</Ui.ProductNavLink>
  </Ui.Container>
);

export default ProductName;
