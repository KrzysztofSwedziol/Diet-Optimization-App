import * as Ui from './NutrientsCard.styles';
import { formatNumber } from '../utils/formatNumber';
import { Plan } from '@/types';

type Props = {
  plan: Plan;
};

const NutrientsCard = ({ plan }: Props) => {
  const nutrients = [
    { label: 'Proteins', value: formatNumber(plan.proteins), target: formatNumber(plan.proteinsTarget), unit: 'g' },
    { label: 'Carbs', value: formatNumber(plan.carbs), target: formatNumber(plan.carbsTarget), unit: 'g' },
    { label: 'Fats', value: formatNumber(plan.fats), target: formatNumber(plan.fatsTarget), unit: 'g' },
  ];

  return (
    <Ui.Container>
      <Ui.Title>Nutrients</Ui.Title>
      <Ui.List>
        {nutrients.map(({ label, value, target, unit }) => {
          const progress = Math.min((value / target) * 100, 100);
          return (
            <Ui.Item key={label}>
              <Ui.Row>
                <Ui.Label>{label}</Ui.Label>
                <Ui.Value>
                  {value} / {target} {unit}
                </Ui.Value>
              </Ui.Row>
              <Ui.ProgressBar>
                <Ui.ProgressFill $progress={progress} />
              </Ui.ProgressBar>
            </Ui.Item>
          );
        })}
      </Ui.List>
    </Ui.Container>
  );
};

export default NutrientsCard;
