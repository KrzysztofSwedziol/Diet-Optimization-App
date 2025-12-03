import React, { useState } from 'react';
import { AppButton } from '../../components';
import MacroTable from '../../components/MacroTable/MacroTable.tsx';
import { MacroKey, MacroValues } from '../../components/MacroTable/types.tsx';
import { Mode } from './types.ts';
import { FormGrid } from '../Auth/Auth.styles.ts';
import { usePlanGeneration } from '@/context/index.ts';
import { useNavigate } from 'react-router-dom';
import * as Ui from './SetConstraints.styles.ts';

type Props = {
  macroValues: MacroValues;
  onChange: (key: MacroKey, v: string) => void;
  mode: Mode;
};

const SetConstraintsForm: React.FC<Props> = ({ macroValues, onChange, mode }) => {
  const disabledKeys: MacroKey[] = mode === 'CALORIES' ? ['carbs', 'protein', 'fats'] : ['calories'];
  const navigate = useNavigate();
  const { isGenerating, generatePlan } = usePlanGeneration();
  const [error, setError] = useState('');

  const handleGoBack = () => navigate(-1);

  const handleSubmit = async () => {
    setError('');
    const result = await generatePlan();
    if (result.ok) {
      navigate('/plans');
      return;
    }
    setError(result.fieldErrors?.method ?? result.fieldErrors?.name ?? result.message);
  };

  return (
    <FormGrid onSubmit={handleSubmit}>
      <MacroTable macroValues={macroValues} onChange={onChange} disabledKeys={disabledKeys} />
      <AppButton reversed fullWidth type="button" onClick={handleGoBack}>
        Back
      </AppButton>
      <AppButton fullWidth type="button" onClick={handleSubmit} disabled={isGenerating} aria-disabled={isGenerating}>
        {isGenerating ? 'Generating…' : 'Generate'}
      </AppButton>
      {error && <Ui.Error>{error}</Ui.Error>}
    </FormGrid>
  );
};

export default SetConstraintsForm;
