import { useState } from 'react';

import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SetConstraintsLayout from './SetConstraintsLayout.tsx';
import MacroTable, { MacroKey, MacroValues } from '../../components/MacroTable/MacroTable.tsx';
import SegmentedPicker from '../../components/SegmentedPicker/SegmentedPicker.tsx';
import { AppButton } from '../../components';

type Mode = 'CALORIES' | 'NUTRIENTS';

const Buttons = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 20px;
`;

const SetConstraints = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>('CALORIES');
  const [values, setValues] = useState<MacroValues>({
    calories: '2229',
    carbs: '118',
    protein: '175',
    fats: '112',
  });

  const onChangeValue = (key: MacroKey, v: string) => setValues(prev => ({ ...prev, [key]: v }));

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/plan/review'); // następny krok w flow
  };

  const back = () => navigate(-1);

  return (
    <SetConstraintsLayout
      title="Set Constraints"
      description="Define how much energy and nutrients you want in your daily plan. We'll handle the rest — intelligently optimizing your plan around these targets."
    >
      <SegmentedPicker
        options={[
          { value: 'CALORIES', label: 'By Calories' },
          { value: 'NUTRIENTS', label: 'By Nutrients' },
        ]}
        value={mode}
        onChange={val => setMode(val as Mode)}
      />

      <form onSubmit={next}>
        <MacroTable
          values={values}
          onChange={onChangeValue}
          disabledKeys={mode === 'CALORIES' ? (['carbs', 'protein', 'fats'] as MacroKey[]) : []}
        />

        <Buttons>
          <AppButton reversed fullWidth type="button" onClick={back}>
            Back
          </AppButton>
          <AppButton fullWidth type="submit">
            Next
          </AppButton>
        </Buttons>
      </form>
    </SetConstraintsLayout>
  );
};

export default SetConstraints;
