import { createContext, useContext, useMemo, useState } from 'react';

type PlanGenerationContextType = {
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  // values: {
  //   calories: number,
  //   carbs: number,
  //   protein: number,
  //   fats: number,
  // }
  // method: GenerationMode,
};

const PlanGenerationContext = createContext<PlanGenerationContextType | undefined>(undefined);

export const PlanGenerationProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const value = useMemo(() => ({ name, setName, description, setDescription }), [name, description]);

  return <PlanGenerationContext.Provider value={value}>{children}</PlanGenerationContext.Provider>;
};

export const usePlanGeneration = () => {
  const ctx = useContext(PlanGenerationContext);
  if (!ctx) throw new Error('usePlanGeneration must be used inside PlanGenerationProvider');
  return ctx;
};
