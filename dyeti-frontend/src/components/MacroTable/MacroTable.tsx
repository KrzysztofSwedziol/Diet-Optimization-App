import { Card, Row, Label } from './MacroTable.styles.ts';
import InputWithSuffix from '../Inputs/InputWithSuffix/InputWithSuffix.tsx';
import { MacroKey, MacroValues } from './types.tsx';

type Props = {
  macroValues: MacroValues;
  onChange: (key: MacroKey, value: string) => void;
  disabledKeys?: MacroKey[];
};

const MacroTable = ({ macroValues, onChange, disabledKeys = [] }: Props) => {
  const isDisabled = (k: MacroKey) => disabledKeys.includes(k);

  return (
    <Card>
      <Row>
        <Label>Calories</Label>
        <InputWithSuffix
          type="number"
          value={macroValues.calories}
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
          value={macroValues.carbs}
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
          value={macroValues.protein}
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
          value={macroValues.fats}
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
