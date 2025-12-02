import { useGetProductsWithPreferences, useUpdateProductPreference } from '@/api/product/hooks';
import ProductsSearchBar from './components/ProductsSearchBar';
import * as Ui from './Preferences.styles';
import { Spinner } from '@/components';
import ProductModal from './components/ProductModal';
import { useState } from 'react';
import { ProductWithPreference } from '@/types';
import Header from './components/Header';
import ProductPreferenceCard from './components/ProductPreferenceCard';
import WarningCard from './components/WarningCard';

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
      <Header />
      <Ui.Content>
        {productsWithPreferences.length < 5 && (
          <WarningCard
            title="⚠️ Add more preferences"
            description="To get the best personalized diet plan, please set preferences for at least 5 different products."
          />
        )}
        <div>
          <Ui.ProductSearchBarContainer>
            <ProductsSearchBar products={products} onProductClick={setSelectedProduct} />
          </Ui.ProductSearchBarContainer>
          {productsWithPreferences.length === 0 ? (
            <Ui.EmptyState>
              <Ui.EmptyTitle>No preferences yet</Ui.EmptyTitle>
              <Ui.EmptyDescription>Search for a product above and set your first preference.</Ui.EmptyDescription>
            </Ui.EmptyState>
          ) : (
            <Ui.Grid>
              {productsWithPreferences.map(item => (
                <ProductPreferenceCard key={item.product.id} item={item} onClick={setSelectedProduct} />
              ))}
            </Ui.Grid>
          )}
        </div>
      </Ui.Content>
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
