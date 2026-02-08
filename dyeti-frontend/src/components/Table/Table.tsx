import { type Table as TableType } from '@tanstack/react-table';
import * as Ui from './Table.styles';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import Pagination from '../Pagination/Pagination';
import TableEmpty from './components/TableEmpty';

interface Props<TData> {
  table: TableType<TData>;
  pagination?: boolean;
  emptyMessage?: string;
}

const Table = <TData extends object>({
  table,
  pagination = true,
  emptyMessage = 'No data available',
}: Props<TData>) => {
  const headerGroups = table.getHeaderGroups();
  const { rows } = table.getRowModel();

  if (rows.length === 0) {
    return <TableEmpty message={emptyMessage} />;
  }

  return (
    <Ui.Container>
      <Ui.StyledTable>
        <TableHead headerGroups={headerGroups} />
        <TableBody rows={rows} />
      </Ui.StyledTable>

      {pagination && <Pagination table={table} />}
    </Ui.Container>
  );
};

export default Table;
