import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Mode } from '@/pages/SetConstraints/types.ts';
import { calculateCalories, gramsFromCalories } from '@/pages/SetConstraints/utils.ts';
import { INITIAL_CALORIES, KCAL_PER_G, PROPORTIONS } from '@/pages/SetConstraints/constants.ts';
import type { FieldErrors, GenerateResult, GenerationMode, PlanGenerationRequest } from '@/api/types.ts';
import { useGenerateProductPlan } from '@/api/plans/hooks';
import { MacroValues } from '@/components/MacroTable/types';

type PlanGenerationContextType = {
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  mode: Mode;
  setMode: (m: Mode) => void;

  macroValues: MacroValues;
  setMacroValues: React.Dispatch<React.SetStateAction<MacroValues>>;

  isGenerating: boolean;
  generatePlan: (method: GenerationMode) => Promise<GenerateResult>;
};

const PlanGenerationContext = createContext<PlanGenerationContextType | undefined>(undefined);

export const PlanGenerationProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState<Mode>('CALORIES');
  const [isGenerating, setIsGenerating] = useState(false);

  const { mutateAsync: generateProductPlan } = useGenerateProductPlan();

  const [macroValues, setMacroValues] = useState<MacroValues>({
    calories: INITIAL_CALORIES,
    carbs: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.CARBS, KCAL_PER_G.CARBS, 0),
    protein: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.PROTEIN, KCAL_PER_G.PROTEIN, 0),
    fats: gramsFromCalories(INITIAL_CALORIES, PROPORTIONS.FATS, KCAL_PER_G.FATS, 0),
  });

  const validateFields = useCallback(() => {
    const fieldErrors: FieldErrors = {};
    const trimmed = name.trim();

    if (!trimmed) fieldErrors.name = 'Name cannot be empty';

    const { calories, carbs, protein, fats } = macroValues;
    const isNum = (n: unknown): n is number => typeof n === 'number' && Number.isFinite(n);

    if (!isNum(calories) || calories < 0) fieldErrors.calories = 'Calories must be a non-negative number';
    if (!isNum(carbs) || carbs < 0) fieldErrors.carbs = 'Carbs must be a non-negative number';
    if (!isNum(protein) || protein < 0) fieldErrors.protein = 'Protein must be a non-negative number';
    if (!isNum(fats) || fats < 0) fieldErrors.fats = 'Fats must be a non-negative number';

    const TOL = 10;
    const recalc = calculateCalories(carbs, protein, fats);
    if (isNum(calories) && Math.abs(recalc - calories) > TOL) {
      fieldErrors.calories ??= 'Calories do not match macros';
    }

    if (Object.keys(fieldErrors).length) {
      return { ok: false as const, fieldErrors, message: 'Please fix the highlighted fields.' };
    }
    return { ok: true as const };
  }, [name, macroValues]);

  const generatePlan = useCallback(
    async (method: GenerationMode): Promise<GenerateResult> => {
      const validated = validateFields();
      if (!validated.ok) {
        return {
          ok: false,
          code: 'INVALID_INPUT',
          message: validated.message ?? 'Invalid input',
          fieldErrors: validated.fieldErrors,
        };
      }

      if (method === 'MEAL') {
        return {
          ok: false,
          code: 'UNSUPPORTED_METHOD',
          message: 'Meal-based generation is coming soon.',
          fieldErrors: { method: 'Meal-based generation is coming soon.' },
        };
      }

      setIsGenerating(true);
      try {
        const payload: PlanGenerationRequest = {
          name: name.trim(),
          description: description || undefined,
          caloriesTarget: macroValues.calories,
          proteinTarget: macroValues.protein,
          carbsTarget: macroValues.carbs,
          fatsTarget: macroValues.fats,
        };

        await generateProductPlan(payload);

        return { ok: true, message: 'Plan generated successfully' };
      } catch {
        return { ok: false, code: 'NETWORK', message: 'Could not generate the plan. Please try again.' };
      } finally {
        setIsGenerating(false);
      }
    },
    [validateFields, name, description, macroValues, generateProductPlan],
  );

  const value = useMemo(
    () => ({
      name,
      setName,
      description,
      setDescription,
      mode,
      setMode,
      macroValues,
      setMacroValues,
      isGenerating,
      generatePlan,
    }),
    [name, description, mode, macroValues, isGenerating, generatePlan],
  );

  return <PlanGenerationContext.Provider value={value}>{children}</PlanGenerationContext.Provider>;
};

export const usePlanGeneration = () => {
  const ctx = useContext(PlanGenerationContext);
  if (!ctx) throw new Error('usePlanGeneration must be used inside PlanGenerationProvider');
  return ctx;
};
