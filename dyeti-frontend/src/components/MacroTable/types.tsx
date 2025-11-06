export type MacroValues = {
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
};

export type MacroKey = keyof MacroValues;
