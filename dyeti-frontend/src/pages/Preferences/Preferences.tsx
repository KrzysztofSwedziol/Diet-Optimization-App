import { useGetProductsWithPreferences } from '@/api/product/hooks';
import ProductsSearchBar from './components/ProductsSearchBar';
import * as Ui from './Preferences.styles';
import { Spinner } from '@/components';

const Preferences = () => {
  const { data: products, isLoading: isLoading, isError } = useGetProductsWithPreferences();

  if (isLoading)
    return (
      <Ui.StatusContainer>
        <Spinner />
        <Ui.StatusText>Loading preferences...</Ui.StatusText>
      </Ui.StatusContainer>
    );

  if (isError || !products)
    return (
      <Ui.StatusContainer>
        <Ui.StatusText>Oops! Something went wrong. Try again later.</Ui.StatusText>
      </Ui.StatusContainer>
    );

  const productsWithPreferences = products.filter(p => p.preference > 0);

  return (
    <Ui.Container>
      <ProductsSearchBar products={products} />
      {productsWithPreferences.map(({ product, preference }) => (
        <div key={product.id}>
          {product.name}: {preference}
        </div>
      ))}
    </Ui.Container>
  );
};

export default Preferences;
