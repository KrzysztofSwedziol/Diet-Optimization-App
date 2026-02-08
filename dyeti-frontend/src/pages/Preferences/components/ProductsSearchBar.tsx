import { useMemo, useState } from 'react';
import { ProductWithPreference } from '@/types';
import { SearchableDropdown } from '@/components/SearchableDropdown/SearchableDropdown';
import ProductsSearchBarItem from './ProductsSearchBarItem';
import Fuse from 'fuse.js';

type Props = {
  products: ProductWithPreference[];
  onProductClick: (product: ProductWithPreference) => void;
};

const ProductsSearchBar = ({ products, onProductClick }: Props) => {
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ['product.name'],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [products],
  );

  const filteredProducts = query ? fuse.search(query).map(result => result.item) : products;

  return (
    <SearchableDropdown
      items={filteredProducts}
      query={query}
      onSearch={setQuery}
      renderItem={({ item }) => <ProductsSearchBarItem product={item} onClick={() => onProductClick(item)} />}
      placeholder="Search for products..."
      noResults="No results found"
    />
  );
};

export default ProductsSearchBar;
