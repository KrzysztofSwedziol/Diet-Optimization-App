import { useState } from 'react';
import { ProductWithPreference } from '@/types';
import { SearchableDropdown } from '@/components/SearchableDropdown/SearchableDropdown';
import ProductsSearchBarItem from './ProductsSearchBarItem';

type Props = {
  products: ProductWithPreference[];
  onProductClick: (product: ProductWithPreference) => void;
};

const ProductsSearchBar = ({ products, onProductClick }: Props) => {
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter(({ product }) => product.name.toLowerCase().includes(query.toLowerCase()));

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
