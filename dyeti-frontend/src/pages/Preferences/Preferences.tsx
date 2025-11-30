import { useGetProductsWithPreferences, useUpdateProductPreference } from '@/api/product/hooks';
import ProductsSearchBar from './components/ProductsSearchBar';
import * as Ui from './Preferences.styles';
import { Spinner } from '@/components';
import ProductModal from './components/ProductModal';
import { useState } from 'react';
import { ProductWithPreference } from '@/types';

const Preferences = () => {
  const { data: products, isLoading: isLoading, isError } = useGetProductsWithPreferences();
  const { mutate: updateProductPreference } = useUpdateProductPreference();
  const [selectedProduct, setSelectedProduct] = useState<ProductWithPreference | null>(null);

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
      <ProductsSearchBar products={products} onProductClick={setSelectedProduct} />
      {productsWithPreferences.map(({ product, preference }) => (
        <div key={product.id}>
          {product.name}: {preference}
        </div>
      ))}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSavePreference={(id, preference) => updateProductPreference({ productId: id, preference })}
        />
      )}
    </Ui.Container>
  );
};

export default Preferences;
