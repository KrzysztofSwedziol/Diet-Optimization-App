import { useGetPlans } from '@/api/plan/hooks';
import * as Ui from './Plans.styles';
import PlansTable from './components/PlansTable';
import { Spinner } from '@/components';
import Header from './components/Header';

const Plans = () => {
  const { data: plans = [], isLoading, isError } = useGetPlans();

  if (isLoading)
    return (
      <Ui.StatusContainer>
        <Spinner />
        <Ui.StatusText>Loading plans...</Ui.StatusText>
      </Ui.StatusContainer>
    );

  if (isError)
    return (
      <Ui.StatusContainer>
        <Ui.StatusText>Oops! Something went wrong. Try again later.</Ui.StatusText>
      </Ui.StatusContainer>
    );

  return (
    <Ui.Container>
      <Header />
      <PlansTable plans={plans} />
    </Ui.Container>
  );
};

export default Plans;
