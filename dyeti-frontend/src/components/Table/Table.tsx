import { type Table as TableType } from '@tanstack/react-table';
import * as Ui from './Table.styles';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import Pagination from '../Pagination/Pagination';

interface Props<TData> {
  table: TableType<TData>;
  pagination?: boolean;
}

const Table = <TData extends object>({ table, pagination }: Props<TData>) => {
  return (
    <Ui.Container>
      <Ui.StyledTable>
        <TableHead headerGroups={table.getHeaderGroups()} />
        <TableBody rows={table.getRowModel().rows} />
      </Ui.StyledTable>

      {pagination && <Pagination table={table} />}
    </Ui.Container>
  );
};

export default Table;
