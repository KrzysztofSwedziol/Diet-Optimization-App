import * as Ui from './MacroTable.styles.ts';
import { MacroKey, MacroValues } from './types.tsx';

type Props = {
  macroValues: MacroValues;
  onChange: (key: MacroKey, value: string | number) => void;
  disabledKeys?: MacroKey[];
};

const MacroTable = ({ macroValues, onChange, disabledKeys = [] }: Props) => {
  const isDisabled = (k: MacroKey) => disabledKeys.includes(k);

  return (
    <Ui.Card>
      <Ui.Row>
        <Ui.Label>Calories</Ui.Label>
        <Ui.NumericInput
          type="number"
          min={0}
          value={String(macroValues.calories)}
          onChange={e => onChange('calories', Math.max(0, Number(e.target.value)))}
          placeholder="0"
          suffix="kcal"
          textAlign="center"
          width="40%"
          disabled={isDisabled('calories')}
        />
      </Ui.Row>

      <Ui.Row>
        <Ui.Label>Carbs</Ui.Label>
        <Ui.NumericInput
          type="number"
          min={0}
          value={String(macroValues.carbs)}
          onChange={e => onChange('carbs', Math.max(0, Number(e.target.value)))}
          placeholder="0"
          suffix="g"
          textAlign="center"
          width="40%"
          disabled={isDisabled('carbs')}
        />
      </Ui.Row>

      <Ui.Row>
        <Ui.Label>Protein</Ui.Label>
        <Ui.NumericInput
          type="number"
          min={0}
          value={String(macroValues.protein)}
          onChange={e => onChange('protein', Math.max(0, Number(e.target.value)))}
          placeholder="0"
          suffix="g"
          textAlign="center"
          width="40%"
          disabled={isDisabled('protein')}
        />
      </Ui.Row>

      <Ui.Row>
        <Ui.Label>Fats</Ui.Label>
        <Ui.NumericInput
          type="number"
          min={0}
          value={String(macroValues.fats)}
          onChange={e => onChange('fats', Math.max(0, Number(e.target.value)))}
          placeholder="0"
          suffix="g"
          textAlign="center"
          width="40%"
          disabled={isDisabled('fats')}
        />
      </Ui.Row>
    </Ui.Card>
  );
};

export default MacroTable;
