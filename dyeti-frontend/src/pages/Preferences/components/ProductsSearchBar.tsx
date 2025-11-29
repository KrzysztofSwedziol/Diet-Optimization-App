import { useState } from 'react';
import { ProductWithPreference } from '@/types';
import { SearchableDropdown } from '@/components/SearchableDropdown/SearchableDropdown';
import ProductsSearchBarItem from './ProductsSearchBarItem';

type Props = {
  products: ProductWithPreference[];
};

const ProductsSearchBar = ({ products }: Props) => {
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter(({ product }) => product.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <SearchableDropdown
      items={filteredProducts}
      query={query}
      onSearch={setQuery}
      renderItem={({ item }) => <ProductsSearchBarItem product={item} />}
      placeholder="Search for products..."
      noResults="No results found"
    />
  );
};

export default ProductsSearchBar;
