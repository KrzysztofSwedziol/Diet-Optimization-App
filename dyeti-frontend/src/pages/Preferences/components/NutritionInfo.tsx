import * as Ui from './NutritionInfo.styles';

type Props = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  description?: string;
};

const NutritionInfo = ({ kcal, protein, carbs, fat }: Props) => {
  return (
    <Ui.Container>
      <Ui.Grid>
        <Ui.Block>
          <Ui.Label>Kcal</Ui.Label>
          <Ui.Value>{kcal}</Ui.Value>
        </Ui.Block>

        <Ui.Block>
          <Ui.Label>Protein</Ui.Label>
          <Ui.Value>{protein} g</Ui.Value>
        </Ui.Block>

        <Ui.Block>
          <Ui.Label>Carbs</Ui.Label>
          <Ui.Value>{carbs} g</Ui.Value>
        </Ui.Block>

        <Ui.Block>
          <Ui.Label>Fat</Ui.Label>
          <Ui.Value>{fat} g</Ui.Value>
        </Ui.Block>
      </Ui.Grid>
    </Ui.Container>
  );
};

export default NutritionInfo;
