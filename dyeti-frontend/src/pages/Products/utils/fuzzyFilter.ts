import Fuse from 'fuse.js';
import { type FilterFn } from '@tanstack/react-table';
import { ProductWithPreference } from '@/types';

// Custom fuzzy filter function
export const fuzzyFilter: FilterFn<ProductWithPreference> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);

  // If no value or filter, include row
  if (!value || !filterValue) return true;

  // Create a Fuse instance for this value
  const fuse = new Fuse([{ value }], {
    keys: ['value'],
    threshold: 0.3,
    ignoreLocation: true,
  });

  return fuse.search(filterValue).length > 0;
};
