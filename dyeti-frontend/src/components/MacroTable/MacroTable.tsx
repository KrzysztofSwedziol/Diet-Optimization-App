import { Card, Row, Label } from './MacroTable.styles.tsx';
import InputWithSuffix from '../Inputs/InputWithSuffix/InputWithSuffix.tsx';
import { MacroKey, MacroValues } from './types.tsx';

type Props = {
  values: MacroValues;
  onChange: (key: MacroKey, value: string) => void;
  disabledKeys?: MacroKey[];
};

const MacroTable = ({ values, onChange, disabledKeys = [] }: Props) => {
  const isDisabled = (k: MacroKey) => disabledKeys.includes(k);

  return (
    <Card>
      <Row>
        <Label>Calories</Label>
        <InputWithSuffix
          type="number"
          value={values.calories}
          onChange={e => onChange('calories', e.target.value)}
          placeholder="0"
          suffix="kcal"
          textAlign="center"
          width="40%"
          disabled={isDisabled('calories')}
        />
      </Row>

      <Row>
        <Label>Carbs</Label>
        <InputWithSuffix
          type="number"
          value={values.carbs}
          onChange={e => onChange('carbs', e.target.value)}
          placeholder="0"
          suffix="g"
          textAlign="center"
          width="40%"
          disabled={isDisabled('carbs')}
        />
      </Row>

      <Row>
        <Label>Protein</Label>
        <InputWithSuffix
          type="number"
          value={values.protein}
          onChange={e => onChange('protein', e.target.value)}
          placeholder="0"
          suffix="g"
          textAlign="center"
          width="40%"
          disabled={isDisabled('protein')}
        />
      </Row>

      <Row>
        <Label>Fats</Label>
        <InputWithSuffix
          type="number"
          value={values.fats}
          onChange={e => onChange('fats', e.target.value)}
          placeholder="0"
          suffix="g"
          textAlign="center"
          width="40%"
          disabled={isDisabled('fats')}
        />
      </Row>
    </Card>
  );
};

export default MacroTable;
