import { createContext, useContext, useMemo, useState } from 'react';
import type { Mode } from '../../../pages/SetConstraints/types';

import { gramsFromCalories } from '../../../pages/SetConstraints/utils';
import { INITIAL_CALORIES, KCAL_PER_G, PROPORTIONS } from '../../../pages/SetConstraints/constants';
import { MacroValues } from '../../MacroTable/types.tsx';

type PlanGenerationContextType = {
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  mode: Mode;
  setMode: (m: Mode) => void;

  macroValues: MacroValues;
  setMacroValues: React.Dispatch<React.SetStateAction<MacroValues>>;
};

const PlanGenerationContext = createContext<PlanGenerationContextType | undefined>(undefined);

export const PlanGenerationProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [mode, setMode] = useState<Mode>('CALORIES'); // NEW

  const [macroValues, setMacroValues] = useState<MacroValues>({
    calories: INITIAL_CALORIES,
    carbs: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.CARBS, KCAL_PER_G.CARBS, 0),
    protein: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.PROTEIN, KCAL_PER_G.PROTEIN, 0),
    fats: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.FATS, KCAL_PER_G.FATS, 0),
  });

  const value = useMemo(
    () => ({ name, setName, description, setDescription, mode, setMode, macroValues, setMacroValues }),
    [name, description, mode, macroValues],
  );

  return <PlanGenerationContext.Provider value={value}>{children}</PlanGenerationContext.Provider>;
};

export const usePlanGeneration = () => {
  const ctx = useContext(PlanGenerationContext);
  if (!ctx) throw new Error('usePlanGeneration must be used inside PlanGenerationProvider');
  return ctx;
};
