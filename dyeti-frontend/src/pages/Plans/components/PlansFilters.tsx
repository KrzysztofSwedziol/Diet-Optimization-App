import { SortBy } from '@/components';
import * as Ui from './PlansFilters.styles';
import { type ColumnDef, type SortingState } from '@tanstack/react-table';
import { Plan } from '@/types';

type Props<T> = {
  columns: ColumnDef<Plan, T>[];
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
  onSearch: (query: string) => void;
};

const PlansFilters = <T,>({ columns, sorting, setSorting, onSearch }: Props<T>) => {
  return (
    <Ui.FiltersContainer>
      <Ui.StyledSearchBar onSearch={onSearch} />
      <SortBy
        columns={columns.map(c => ({ id: c.id!, label: c.header as string }))}
        sorting={sorting}
        setSorting={setSorting}
      />
    </Ui.FiltersContainer>
  );
};

export default PlansFilters;
