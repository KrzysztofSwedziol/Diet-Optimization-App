import { Product } from '@/types';
import * as Ui from './ProductName.styles';
import { useDeleteProductPreference, useUpdateProductPreference } from '@/api/product/hooks';

type Props = {
  product: Product;
  favourite: boolean;
};

const ProductName = ({ product, favourite }: Props) => {
  const { mutate: updateProductPreference, isPending } = useUpdateProductPreference();
  const { mutate: deleteProductPreference } = useDeleteProductPreference();

  return (
    <Ui.Container>
      <Ui.StarButton
        type="button"
        disabled={isPending}
        aria-label={favourite ? 'Unstar Product' : 'Star Product'}
        onClick={e => {
          e.preventDefault();

          if (favourite) {
            deleteProductPreference(product.id);
            return;
          }
          updateProductPreference({ productId: product.id, preference: 0.0 });
        }}
      >
        {favourite ? <Ui.StarIconFill aria-hidden /> : <Ui.StarIcon aria-hidden />}
      </Ui.StarButton>

      <Ui.ProductNavLink to={`/products/${product.id}`}>{product.name}</Ui.ProductNavLink>
    </Ui.Container>
  );
};

export default ProductName;
