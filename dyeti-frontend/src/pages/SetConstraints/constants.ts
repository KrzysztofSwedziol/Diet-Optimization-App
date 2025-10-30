export const KCAL_PER_G = { CARBS: 4, PROTEIN: 4, FATS: 9 } as const;
export const PROPORTIONS = { CARBS: 0.5, PROTEIN: 0.2, FATS: 0.3 } as const;
export const INITIAL_CALORIES = 2500;
export const MODE_OPTIONS = [
  { value: 'CALORIES', label: 'By Calories' },
  { value: 'NUTRIENTS', label: 'By Nutrients' },
];
