import { useNavigate } from 'react-router-dom';
import SetConstraintsLayout from './SetConstraintsLayout.tsx';
import SegmentedPicker from '../../components/SegmentedPicker/SegmentedPicker.tsx';
import { useEffect, useRef, useState } from 'react';
import { Mode, Values } from './types.ts';
import { MacroKey } from '../../components/MacroTable/types.tsx';
import SetConstraintsForm from './SetConstraintsForm.tsx';
import { INITIAL_CALORIES, KCAL_PER_G, MODE_OPTIONS, PROPORTIONS } from './constants.ts';
import { calculateCalories, gramsFromCalories } from './utils.ts';

const SetConstraints = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>('CALORIES');
  const [values, setValues] = useState<Values>({
    calories: INITIAL_CALORIES,
    carbs: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.CARBS, KCAL_PER_G.CARBS, 0),
    protein: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.PROTEIN, KCAL_PER_G.PROTEIN, 0),
    fats: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.FATS, KCAL_PER_G.FATS, 0),
  });
  const modeRef = useRef<Mode>(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const currentMode = modeRef.current;

    if (currentMode === 'CALORIES') {
      const cals = values.calories;
      if (!Number.isFinite(cals) || cals < 0) return;

      const nextCarbs = gramsFromCalories(cals, PROPORTIONS.CARBS, KCAL_PER_G.CARBS, 0);
      const nextProtein = gramsFromCalories(cals, PROPORTIONS.PROTEIN, KCAL_PER_G.PROTEIN, 0);
      const nextFats = gramsFromCalories(cals, PROPORTIONS.FATS, KCAL_PER_G.FATS, 0);

      if (values.carbs !== nextCarbs || values.protein !== nextProtein || values.fats !== nextFats) {
        setValues(prev => ({ ...prev, carbs: nextCarbs, protein: nextProtein, fats: nextFats }));
      }
    } else {
      const kcal = calculateCalories(values.carbs, values.protein, values.fats);
      if (values.calories !== kcal) {
        setValues(prev => ({ ...prev, calories: kcal }));
      }
    }
  }, [values.calories, values.carbs, values.protein, values.fats]);

  const onChangeValue = (key: MacroKey, v: string | number) => {
    const num = typeof v === 'number' ? v : v.trim() === '' ? 0 : Number(v);
    if (!Number.isFinite(num)) return;
    setValues(prev => ({ ...prev, [key]: num }));
  };

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/plan/review');
  };

  const back = () => navigate(-1);

  return (
    <SetConstraintsLayout
      title="Set Constraints"
      description="Define how much energy and nutrients you want in your daily plan. We'll handle the rest — intelligently optimizing your plan around these targets."
    >
      <SegmentedPicker options={MODE_OPTIONS} value={mode} onChange={val => setMode(val as Mode)} />

      <SetConstraintsForm onSubmit={next} values={values} onChange={onChangeValue} mode={mode} onBack={back} />
    </SetConstraintsLayout>
  );
};

export default SetConstraints;
