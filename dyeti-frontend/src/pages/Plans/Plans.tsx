import { useGetPlans } from '@/api/plan/hooks';
import * as Ui from './Plans.styles';
import PlansTable from './components/PlansTable';
import { QueryState } from '@/components';
import Header from './components/Header';

const Plans = () => {
  const { data: plans = [], isLoading, isError } = useGetPlans();

  return (
    <QueryState isLoading={isLoading} isError={isError} loadingText={'Loading plans...'}>
      <Ui.Container>
        <Header />
        <PlansTable plans={plans} />
      </Ui.Container>
    </QueryState>
  );
};

export default Plans;
