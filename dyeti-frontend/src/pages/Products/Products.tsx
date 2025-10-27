import * as Ui from './Products.styles';
import { useGetProductsWithPreferences } from '@/api/product/hooks';
import ProductsTable from './components/ProductsTable';
import { Spinner } from '@/components';

const Products = () => {
  const { data: products = [], isLoading, isError } = useGetProductsWithPreferences();

  if (isLoading)
    return (
      <Ui.StatusContainer>
        <Spinner />
        <Ui.StatusText>Loading products...</Ui.StatusText>
      </Ui.StatusContainer>
    );

  if (isError)
    return (
      <Ui.StatusContainer>
        <Ui.StatusText>Oops! Something went wrong. Try again later.</Ui.StatusText>
      </Ui.StatusContainer>
    );

  return (
    <Ui.Container>
      <Ui.Title>Products</Ui.Title>
      <ProductsTable products={products} />
    </Ui.Container>
  );
};

export default Products;
