import MacroTable from '../../../components/MacroTable/MacroTable.tsx';
import { type UseFormReturn } from 'react-hook-form';
import { FormValues } from '../types.ts';
import { useState, useEffect } from 'react';
import { gramsFromCalories } from '../utils/utils.ts';
import { PROPORTIONS, KCAL_PER_G } from '../constants/constants.ts';
import { styled } from 'styled-components';
import StepControls from './StepControls.tsx';
import { SegmentedPicker } from '@/components';
import { MacroKey } from '@/components/MacroTable/types.tsx';
import * as Ui from './Steps.styles.ts';

type Mode = 'calories' | 'macros';

export const MODE_OPTIONS: { value: Mode; label: string }[] = [
  { value: 'calories', label: 'By Calories' },
  { value: 'macros', label: 'By Nutrients' },
];

type Props = {
  formMethods: UseFormReturn<FormValues>;
  goBack: () => void;
};

const StepConstraints = ({ formMethods, goBack }: Props) => {
  const { watch, setValue, formState } = formMethods;
  const { isSubmitting, errors } = formState;
  const [mode, setMode] = useState<Mode>('calories');

  const values = watch(['calories', 'carbs', 'protein', 'fats']);
  const [calories, carbs, protein, fats] = values;

  const disabledKeys: MacroKey[] = mode === 'calories' ? ['carbs', 'protein', 'fats'] : ['calories'];

  useEffect(() => {
    switch (mode) {
      case 'calories': {
        const nextCarbs = gramsFromCalories(calories, PROPORTIONS.CARBS, KCAL_PER_G.CARBS, 0);
        const nextProtein = gramsFromCalories(calories, PROPORTIONS.PROTEIN, KCAL_PER_G.PROTEIN, 0);
        const nextFats = gramsFromCalories(calories, PROPORTIONS.FATS, KCAL_PER_G.FATS, 0);
        setValue('carbs', nextCarbs);
        setValue('protein', nextProtein);
        setValue('fats', nextFats);
        break;
      }
      case 'macros': {
        const nextCalories = carbs * KCAL_PER_G.CARBS + protein * KCAL_PER_G.PROTEIN + fats * KCAL_PER_G.FATS;
        setValue('calories', nextCalories);
        break;
      }
    }
  }, [calories, carbs, protein, fats, mode, setValue]);

  return (
    <Ui.Container>
      <Ui.Section>
        <Ui.Subtitle>Step 3: Define Your Goals</Ui.Subtitle>
        <Ui.Text>Set your target calories or macronutrients, and the rest will be calculated automatically.</Ui.Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SegmentedPicker options={MODE_OPTIONS} value={mode} onChange={newMode => setMode(newMode)} />
          <MacroTable
            macroValues={{ calories, protein, carbs, fats }}
            onChange={(key, value) => setValue(key, Number(value))}
            disabledKeys={disabledKeys}
          />
        </div>
      </Ui.Section>

      <Ui.Section>
        {errors.root?.serverError && <Error>{errors.root.serverError.message}</Error>}
        <StepControls onBack={goBack} withSubmit isSubmitting={isSubmitting} />
      </Ui.Section>
    </Ui.Container>
  );
};

export const Error = styled.p`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.danger[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export default StepConstraints;
