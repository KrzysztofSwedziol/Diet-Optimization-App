import React from 'react';
import { AppButton } from '../../components';
import MacroTable from '../../components/MacroTable/MacroTable.tsx';
import { MacroKey, MacroValues } from '../../components/MacroTable/types.tsx';
import { Mode } from './types.ts';
import { FormGrid } from '../Auth/Auth.styles.ts';

type Props = {
  macroValues: MacroValues;
  onChange: (key: MacroKey, v: string) => void;
  mode: Mode;
  onBack: () => void | Promise<void>;
  onSubmit: (e: React.FormEvent) => void;
};

const SetConstraintsForm: React.FC<Props> = ({ macroValues, onChange, mode, onBack, onSubmit }) => {
  const disabledKeys: MacroKey[] = mode === 'CALORIES' ? ['carbs', 'protein', 'fats'] : ['calories'];

  return (
    <FormGrid onSubmit={onSubmit}>
      <MacroTable macroValues={macroValues} onChange={onChange} disabledKeys={disabledKeys} />
      <AppButton reversed fullWidth type="button" onClick={onBack}>
        Back
      </AppButton>
      <AppButton fullWidth type="submit">
        Next
      </AppButton>
    </FormGrid>
  );
};

export default SetConstraintsForm;
