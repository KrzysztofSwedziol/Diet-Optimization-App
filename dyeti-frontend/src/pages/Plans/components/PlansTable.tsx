import { Plan } from '@/types';
import PlanCard from './PlanCard';
import * as Ui from './PlansTable.styles';
import { usePlansTable } from '../hooks/usePlansTable';
import PlansFilters from './PlansFilters';
import { Pagination } from '@/components';

type Props = {
  plans: Plan[];
};

const PlansTable = ({ plans }: Props) => {
  const { table, columns, rows, sorting, setSorting } = usePlansTable({ plans });

  const handleSearch = (query: string) => {
    const currentFilter = table.getState().columnFilters.find(f => f.id === 'name')?.value ?? '';
    if (currentFilter === query) return;

    table.setColumnFilters(prev => {
      const otherFilters = prev.filter(f => f.id !== 'name');
      return query ? [...otherFilters, { id: 'name', value: query }] : otherFilters;
    });
  };

  return (
    <Ui.Container>
      <PlansFilters columns={columns} sorting={sorting} setSorting={setSorting} onSearch={handleSearch} />
      <Ui.Grid>
        {rows.map(plan => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </Ui.Grid>
      <Pagination table={table} />
    </Ui.Container>
  );
};

export default PlansTable;
