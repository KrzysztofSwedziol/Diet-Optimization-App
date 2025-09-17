import { useState } from 'react';
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
import { Plan } from '@/types';

type Props = {
  plans: Plan[];
  pagination?: boolean;
  pageSize?: number;
};

const columns: ColumnDef<Plan>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'calories', header: 'Calories', accessorKey: 'calories' },
  { id: 'proteins', header: 'Proteins', accessorKey: 'proteins' },
  { id: 'carbs', header: 'Carbs', accessorKey: 'carbs' },
  { id: 'fats', header: 'Fats', accessorKey: 'fats' },
];

export const usePlansTable = ({ plans, pagination = true, pageSize = 9 }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: plans,
    columns,
    state: { sorting, columnFilters },
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    initialState: { pagination: { pageSize } },
  });

  const rows = table.getRowModel().rows.map(r => r.original);

  return {
    table,
    columns,
    rows,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  };
};
