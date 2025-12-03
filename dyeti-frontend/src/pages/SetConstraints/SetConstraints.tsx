import SegmentedPicker from '../../components/SegmentedPicker/SegmentedPicker.tsx';
import { useEffect, useRef } from 'react';
import { Mode } from './types.ts';
import * as Ui from './SetConstraints.styles.ts';
import { MacroKey } from '../../components/MacroTable/types.tsx';
import SetConstraintsForm from './SetConstraintsForm.tsx';
import { KCAL_PER_G, MODE_OPTIONS, PROPORTIONS } from './constants.ts';
import { calculateCalories, gramsFromCalories } from './utils.ts';
import FullLayout from '../../components/Layout/FullLayout.tsx';
import dyeti from '../../assets/dyeti-pencil.svg';
import { usePlanGeneration } from '@/context';

const SetConstraints = () => {
  const { mode, setMode, macroValues, setMacroValues } = usePlanGeneration();
  const modeRef = useRef<Mode>(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const currentMode = modeRef.current;

    if (currentMode === 'CALORIES') {
      const cals = macroValues.calories;
      if (!Number.isFinite(cals) || cals < 0) return;

      const nextCarbs = gramsFromCalories(cals, PROPORTIONS.CARBS, KCAL_PER_G.CARBS, 0);
      const nextProtein = gramsFromCalories(cals, PROPORTIONS.PROTEIN, KCAL_PER_G.PROTEIN, 0);
      const nextFats = gramsFromCalories(cals, PROPORTIONS.FATS, KCAL_PER_G.FATS, 0);

      if (macroValues.carbs !== nextCarbs || macroValues.protein !== nextProtein || macroValues.fats !== nextFats) {
        setMacroValues(prev => ({ ...prev, carbs: nextCarbs, protein: nextProtein, fats: nextFats }));
      }
    } else {
      const kcal = calculateCalories(macroValues.carbs, macroValues.protein, macroValues.fats);
      if (macroValues.calories !== kcal) {
        setMacroValues(prev => ({ ...prev, calories: kcal }));
      }
    }
  }, [macroValues.calories, macroValues.carbs, macroValues.protein, macroValues.fats, setMacroValues]);

  const onChangeValue = (key: MacroKey, v: string | number) => {
    const num = typeof v === 'number' ? v : v.trim() === '' ? 0 : Number(v);
    if (!Number.isFinite(num)) return;
    setMacroValues(prev => ({ ...prev, [key]: num }));
  };

  return (
    <FullLayout
      title="Set Constraints"
      description="Define how much energy and nutrients you want in your daily plan. We'll handle the rest — intelligently optimizing your plan around these targets."
      logo={{ src: dyeti, alt: 'Dyeti-pencil' }}
    >
      <Ui.Container>
        <SegmentedPicker options={MODE_OPTIONS} value={mode} onChange={val => setMode(val as Mode)} />
        <SetConstraintsForm macroValues={macroValues} onChange={onChangeValue} mode={mode} />
      </Ui.Container>
    </FullLayout>
  );
};

export default SetConstraints;
