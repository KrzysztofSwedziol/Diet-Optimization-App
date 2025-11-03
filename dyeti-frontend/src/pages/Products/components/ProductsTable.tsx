import { Table } from '@/components';
import * as Ui from './ProductsTable.styles';
import ProductsTableFilters from './ProductsTableFilters';
import { useProductsTable } from '../hooks/useProductsTable';
import { ProductWithPreference } from '@/types';

type Props = {
  products: ProductWithPreference[];
};

const ProductsTable = ({ products }: Props) => {
  const { table, columns, sorting, setSorting } = useProductsTable({ products });

  const handleSearch = (query: string) => {
    const currentFilter = table.getState().columnFilters.find(f => f.id === 'name')?.value ?? '';
    if (currentFilter === query) return;

    table.setColumnFilters(prev => {
      const otherFilters = prev.filter(f => f.id !== 'name');
      return query ? [...otherFilters, { id: 'name', value: query }] : otherFilters;
    });
  };

  return (
    <Ui.Container>
      <ProductsTableFilters columns={columns} sorting={sorting} setSorting={setSorting} onSearch={handleSearch} />
      <Table table={table} pagination emptyMessage="No products found" />
    </Ui.Container>
  );
};

export default ProductsTable;
