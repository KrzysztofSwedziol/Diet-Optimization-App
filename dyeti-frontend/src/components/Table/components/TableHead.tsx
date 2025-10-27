import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import * as Ui from './TableHead.styles';

interface Props<TData> {
  headerGroups: HeaderGroup<TData>[];
}

const TableHead = <TData,>({ headerGroups }: Props<TData>) => {
  return (
    <Ui.TableHead>
      {headerGroups.map(headerGroup => (
        <Ui.TableRow key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <Ui.TableHeader key={header.id}>
              {!header.isPlaceholder && (
                <Ui.HeaderContent>{flexRender(header.column.columnDef.header, header.getContext())}</Ui.HeaderContent>
              )}
            </Ui.TableHeader>
          ))}
        </Ui.TableRow>
      ))}
    </Ui.TableHead>
  );
};

export default TableHead;
