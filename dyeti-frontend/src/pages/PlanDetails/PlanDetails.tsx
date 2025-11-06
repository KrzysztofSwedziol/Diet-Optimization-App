import { useGetPlan } from '@/api/plan/hooks';
import { PageDescription, Spinner } from '@/components';
import { useParams } from 'react-router-dom';
import * as Ui from './PlanDetails.styles';
import MealCard from './components/MealCard';
import NutrientsCard from './components/NutrientsCard';

const PlanDetails = () => {
  const { planId: planIdString } = useParams<{ planId: string }>();
  const planId = Number(planIdString);

  const { data: plan, error, isLoading } = useGetPlan(planId);

  if (isLoading) {
    <Ui.StatusContainer>
      <Spinner />
      <Ui.StatusText>Loading plan...</Ui.StatusText>
    </Ui.StatusContainer>;
  }

  if (error || !plan) {
    return (
      <Ui.StatusContainer>
        <Ui.StatusText>Oops! Something went wrong. Try again later.</Ui.StatusText>
      </Ui.StatusContainer>
    );
  }

  return (
    <Ui.Container>
      <Ui.PlanInfo>
        <Ui.Title>{plan.name}</Ui.Title>
        <PageDescription>{plan.description}</PageDescription>
      </Ui.PlanInfo>
      <Ui.Content>
        <Ui.MealsSection>
          <MealCard title="Plan" products={plan.products} defaultIsOpen />
        </Ui.MealsSection>
        <Ui.NutrientsSection>
          <NutrientsCard
            calories={plan.calories}
            proteins={plan.proteins}
            carbs={plan.carbs}
            fats={plan.fats}
            caloriesTarget={plan.caloriesTarget}
            proteinsTarget={plan.proteinsTarget}
            carbsTarget={plan.carbsTarget}
            fatsTarget={plan.fatsTarget}
          />
        </Ui.NutrientsSection>
      </Ui.Content>
    </Ui.Container>
  );
};

export default PlanDetails;
