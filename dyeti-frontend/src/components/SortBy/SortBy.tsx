import { type SortingState } from '@tanstack/react-table';
import { ChangeEvent } from 'react';
import * as Ui from './SortBy.styles';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

type Props = {
  columns: { id: string; label: string }[];
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
  label?: string;
};

const SortBy = ({ columns, sorting, setSorting, label = 'Sort by' }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (!value) {
      setSorting([]);
      return;
    }

    const lastColonIndex = value.lastIndexOf(':');
    const id = value.slice(0, lastColonIndex);
    const direction = value.slice(lastColonIndex + 1) as SortDirection;

    setSorting([{ id, desc: direction === SortDirection.DESC }]);
  };

  const selectedValue = sorting[0]
    ? `${sorting[0].id}:${sorting[0].desc ? SortDirection.DESC : SortDirection.ASC}`
    : '';

  return (
    <Ui.Container>
      <Ui.Label>{label}</Ui.Label>
      <Ui.StyledSelect value={selectedValue} onChange={handleChange}>
        <option value="">None</option>
        {columns.flatMap(col => [
          <option key={`${col.id}:${SortDirection.ASC}`} value={`${col.id}:${SortDirection.ASC}`}>
            {col.label} (Ascending)
          </option>,
          <option key={`${col.id}:${SortDirection.DESC}`} value={`${col.id}:${SortDirection.DESC}`}>
            {col.label} (Descending)
          </option>,
        ])}
      </Ui.StyledSelect>
    </Ui.Container>
  );
};

export default SortBy;
