import { Table } from '@/components';
import * as Ui from './ProductsTable.styles';
import ProductsTableFilters from './ProductsTableFilters';
import { useProductsTable } from '../hooks/useProductsTable';
import { ProductWithPreference } from '@/types';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';

type Props = {
  products: ProductWithPreference[];
};

const ProductsTable = ({ products }: Props) => {
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

  const filteredProducts = useMemo(() => {
    if (!query) return products;
    return fuse.search(query).map(result => result.item);
  }, [query, fuse, products]);

  const { table, columns, sorting, setSorting } = useProductsTable({
    products: filteredProducts,
  });

  const handleSearch = (search: string) => {
    setQuery(search);
  };

  return (
    <Ui.Container>
      <ProductsTableFilters columns={columns} sorting={sorting} setSorting={setSorting} onSearch={handleSearch} />
      <Table table={table} pagination emptyMessage="No products found" />
    </Ui.Container>
  );
};

export default ProductsTable;
