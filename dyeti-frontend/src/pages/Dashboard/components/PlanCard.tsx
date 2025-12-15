import * as Ui from './PlanCard.styles.ts';
import { Plan } from '@/types';
import NutrientsCard from './NutrientsCard.tsx';
import { formatNumber } from '../utils/formatNumber.ts';
import ProgressRing from '@/pages/Dashboard/components/ProgressRing.tsx';
type Props = {
  plan: Plan;
};
const PlanCard = ({ plan }: Props) => (
  <Ui.Container>
    <Ui.Link href={`/plans/${plan.id}`}>
      <Ui.Header>
        <Ui.Title>{plan.name}</Ui.Title>
        <Ui.Calories>{formatNumber(plan.calories)} kcal</Ui.Calories>
      </Ui.Header>
      <ProgressRing value={plan.calories} target={plan.caloriesTarget} unit={'kcal'} />
      <NutrientsCard plan={plan} />
    </Ui.Link>
  </Ui.Container>
);
export default PlanCard;
