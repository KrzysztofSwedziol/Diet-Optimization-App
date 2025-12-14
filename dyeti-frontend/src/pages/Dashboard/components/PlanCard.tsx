import * as Ui from './PlanCard.styles.ts';
import { Plan } from '@/types';
type Props = {
  plan: Plan;
  isActive: boolean;
};
const PlanCard = ({ plan, isActive }: Props) => (
  <Ui.Container>
    ${plan.calories} ${isActive}
  </Ui.Container>
);
export default PlanCard;
