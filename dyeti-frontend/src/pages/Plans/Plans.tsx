import { useGetPlans } from '@/api/plan/hooks';
import * as Ui from './Plans.styles';
import PlansTable from './components/PlansTable';
import { Spinner } from '@/components';

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
      <Ui.Title>Plans</Ui.Title>
      <PlansTable plans={plans} />
    </Ui.Container>
  );
};

export default Plans;
