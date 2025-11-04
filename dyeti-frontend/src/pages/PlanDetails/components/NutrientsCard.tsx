import * as Ui from './NutrientsCard.styles';
import { formatNumber } from '../utils/formatNumber';

type Props = {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  caloriesTarget: number;
  proteinsTarget: number;
  carbsTarget: number;
  fatsTarget: number;
};

const NutrientsCard = ({
  calories,
  proteins,
  carbs,
  fats,
  caloriesTarget,
  proteinsTarget,
  carbsTarget,
  fatsTarget,
}: Props) => {
  const nutrients = [
    { label: 'Calories', value: formatNumber(calories), target: formatNumber(caloriesTarget), unit: 'kcal' },
    { label: 'Proteins', value: formatNumber(proteins), target: formatNumber(proteinsTarget), unit: 'g' },
    { label: 'Carbs', value: formatNumber(carbs), target: formatNumber(carbsTarget), unit: 'g' },
    { label: 'Fats', value: formatNumber(fats), target: formatNumber(fatsTarget), unit: 'g' },
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
