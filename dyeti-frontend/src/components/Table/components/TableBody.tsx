import { flexRender, type Row } from '@tanstack/react-table';
import * as Ui from './TableBody.styles';

interface Props<TData> {
  rows: Row<TData>[];
}

const TableBody = <TData,>({ rows }: Props<TData>) => (
  <Ui.TableBody>
    {rows.map((row, rowIndex) => (
      <Ui.TableRow key={row.id} $isEven={rowIndex % 2 === 0}>
        {row.getVisibleCells().map(cell => (
          <Ui.TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Ui.TableCell>
        ))}
      </Ui.TableRow>
    ))}
  </Ui.TableBody>
);

export default TableBody;
