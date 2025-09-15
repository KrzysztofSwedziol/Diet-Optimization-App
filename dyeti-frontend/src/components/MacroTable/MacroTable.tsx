import { Card, Row, Label, NumberInput } from './MacroTable.styles.tsx';

export type MacroValues = {
  calories: string;
  carbs: string;
  protein: string;
  fats: string;
};

export type MacroKey = keyof MacroValues;

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
        <NumberInput
          inputMode="numeric"
          type="number"
          value={values.calories}
          onChange={e => onChange('calories', e.target.value)}
          placeholder="0"
        />
      </Row>

      <Row>
        <Label>Carbs</Label>
        <NumberInput
          inputMode="numeric"
          type="number"
          value={values.carbs}
          onChange={e => onChange('carbs', e.target.value)}
          placeholder="0"
          disabled={isDisabled('carbs')}
        />
      </Row>

      <Row>
        <Label>Protein</Label>
        <NumberInput
          inputMode="numeric"
          type="number"
          value={values.protein}
          onChange={e => onChange('protein', e.target.value)}
          placeholder="0"
          disabled={isDisabled('protein')}
        />
      </Row>

      <Row>
        <Label>Fats</Label>
        <NumberInput
          inputMode="numeric"
          type="number"
          value={values.fats}
          onChange={e => onChange('fats', e.target.value)}
          placeholder="0"
          disabled={isDisabled('fats')}
        />
      </Row>
    </Card>
  );
};

export default MacroTable;
