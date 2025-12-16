import { ReactNode, useState } from 'react';
import { useResponsiveColumnVisibility } from '@/hooks/useResponsiveColumnVisibility';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { ProductWithPreference } from '@/types';
// import ProductPreferenceControl from '../components/ProductPreferenceControl';
import ProductName from '../components/ProductName';

type Props = {
  products: ProductWithPreference[];
  pagination?: boolean;
  pageSize?: number;
};

const columns: ColumnDef<ProductWithPreference, ReactNode>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'product.name',
    cell: info => <ProductName product={info.row.original.product} favourite={info.row.original.favourite} />,
  },

  { id: 'calories', header: 'Calories (100g)', accessorKey: 'product.kcal100g' },
  { id: 'protein', header: 'Protein (100g)', accessorKey: 'product.protein100g' },
  { id: 'carbs', header: 'Carbs (100g)', accessorKey: 'product.carbs100g' },
  { id: 'fat', header: 'Fat (100g)', accessorKey: 'product.fat100g' },
  // {
  //   id: 'preference',
  //   header: 'Preference',
  //   accessorKey: 'preference',
  //   cell: info => <ProductPreferenceControl productWithPreference={info.row.original} />,
  // },
];

const hideColumnsBelow: Partial<Record<'md' | 'xl', string[]>> = {
  md: ['calories', 'protein', 'carbs', 'fat'],
  xl: ['protein', 'carbs', 'fat'],
};

export const useProductsTable = ({ products, pagination = true, pageSize = 50 }: Props) => {
  const columnVisibility = useResponsiveColumnVisibility(columns, hideColumnsBelow);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting, columnFilters, columnVisibility },
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    initialState: { columnVisibility, pagination: { pageSize } },
  });

  return { table, columns, sorting, setSorting, columnFilters, setColumnFilters };
};
