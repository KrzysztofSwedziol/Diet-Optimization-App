import React from 'react';
import { AppButton } from '../../components';
import * as Ui from './SetConstrints.styles.tsx';
import MacroTable from '../../components/MacroTable/MacroTable.tsx';
import { MacroKey, MacroValues } from '../../components/MacroTable/types.tsx';
import { Mode } from './types.ts';

type Props = {
  values: MacroValues;
  onChange: (key: MacroKey, v: string) => void;
  mode: Mode;
  onBack: () => void | Promise<void>;
  onSubmit: (e: React.FormEvent) => void;
};

const SetConstraintsForm: React.FC<Props> = ({ values, onChange, mode, onBack, onSubmit }) => {
  const disabledKeys: MacroKey[] = mode === 'CALORIES' ? ['carbs', 'protein', 'fats'] : ['calories'];

  return (
    <form onSubmit={onSubmit}>
      <MacroTable values={values} onChange={onChange} disabledKeys={disabledKeys} />
      <Ui.ButtonsGrid>
        <AppButton reversed fullWidth type="button" onClick={onBack}>
          Back
        </AppButton>
        <AppButton fullWidth type="submit">
          Next
        </AppButton>
      </Ui.ButtonsGrid>
    </form>
  );
};

export default SetConstraintsForm;
