import { Plan } from '@/types';
import * as Ui from './PlanCard.styles';
import { Link } from 'react-router-dom';

type Props = {
  plan: Plan;
};

const formatNumber = (num: number) => num.toFixed(2);

const PlanCard = ({ plan }: Props) => {
  return (
    <Link to={`/plans/${plan.id}`}>
      <Ui.Container>
        <Ui.Header>
          <Ui.Title>{plan.name}</Ui.Title>
          <Ui.Description>{plan.description}</Ui.Description>
        </Ui.Header>

        <Ui.Calories>{formatNumber(plan.calories)} kcal</Ui.Calories>

        <Ui.Nutrients>
          <Ui.Nutrient>
            <Ui.NutrientLabel>Proteins</Ui.NutrientLabel>
            <Ui.NutrientValue>{formatNumber(plan.proteins)} g</Ui.NutrientValue>
          </Ui.Nutrient>
          <Ui.Nutrient>
            <Ui.NutrientLabel>Carbs</Ui.NutrientLabel>
            <Ui.NutrientValue>{formatNumber(plan.carbs)} g</Ui.NutrientValue>
          </Ui.Nutrient>
          <Ui.Nutrient>
            <Ui.NutrientLabel>Fats</Ui.NutrientLabel>
            <Ui.NutrientValue>{formatNumber(plan.fats)} g</Ui.NutrientValue>
          </Ui.Nutrient>
        </Ui.Nutrients>
      </Ui.Container>
    </Link>
  );
};

export default PlanCard;
