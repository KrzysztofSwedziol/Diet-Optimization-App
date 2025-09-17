import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import type { ColumnDef } from '@tanstack/react-table';
import { Breakpoint } from '@/types';

type ColumnsToHideBelowBreakpoints = Partial<Record<Breakpoint, string[]>>;

const getColumnVisibility = <TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  columnsToHideBelowBreakpoints: ColumnsToHideBelowBreakpoints | undefined,
  breakpoints: Record<Breakpoint, string>,
): Record<string, boolean> => {
  const width = window.innerWidth;

  const hiddenIds = Object.entries(columnsToHideBelowBreakpoints ?? {}).flatMap(([bp, ids]) => {
    const bpValue = parseInt(breakpoints[bp as Breakpoint] ?? '0', 10);
    return width < bpValue ? (ids ?? []) : [];
  });

  const visibility: Record<string, boolean> = {};
  columns.forEach(col => {
    if (col.id) {
      visibility[col.id] = !hiddenIds.includes(col.id);
    }
  });

  return visibility;
};

export function useResponsiveColumnVisibility<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  columnsToHideBelowBreakpoints?: ColumnsToHideBelowBreakpoints,
): Record<string, boolean> {
  const { breakpoints } = useTheme();

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    getColumnVisibility(columns, columnsToHideBelowBreakpoints, breakpoints),
  );

  useEffect(() => {
    const handleResize = () => {
      const newVisibility = getColumnVisibility(columns, columnsToHideBelowBreakpoints, breakpoints);

      setColumnVisibility(prev => {
        const changed = Object.keys(newVisibility).some(key => prev[key] !== newVisibility[key]);
        return changed ? newVisibility : prev;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns, columnsToHideBelowBreakpoints, breakpoints]);

  return columnVisibility;
}
