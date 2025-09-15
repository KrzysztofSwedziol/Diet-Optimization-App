import * as Ui from './Pagination.styles';
import type { Table } from '@tanstack/react-table';

interface Props<TData> {
  table: Table<TData>;
}

const Pagination = <TData,>({ table }: Props<TData>) => {
  const pageCount = table.getPageCount();
  const currentIndex = table.getState().pagination.pageIndex;

  const getVisiblePages = () => {
    const pages: number[] = [];
    const start = Math.max(0, currentIndex - 3);
    const end = Math.min(pageCount - 1, currentIndex + 3);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Ui.Container>
      <Ui.PageLink disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
        {'<<'}
      </Ui.PageLink>
      <Ui.PageLink disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
        {'<'}
      </Ui.PageLink>

      {visiblePages[0] > 0 && <Ui.Ellipsis>...</Ui.Ellipsis>}

      {visiblePages.map(page => (
        <Ui.PageLink key={page} $active={page === currentIndex} onClick={() => table.setPageIndex(page)}>
          {page + 1}
        </Ui.PageLink>
      ))}

      {visiblePages[visiblePages.length - 1] < pageCount - 1 && <Ui.Ellipsis>...</Ui.Ellipsis>}

      <Ui.PageLink disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
        {'>'}
      </Ui.PageLink>
      <Ui.PageLink disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(pageCount - 1)}>
        {'>>'}
      </Ui.PageLink>
    </Ui.Container>
  );
};

export default Pagination;
