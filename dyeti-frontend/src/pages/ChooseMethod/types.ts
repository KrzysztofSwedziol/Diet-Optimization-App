import { GenerationMode } from '../../api/types.ts';


export const METHOD_OPTIONS: { value: GenerationMode; label: string }[] = [
  { value: 'PRODUCT', label: 'Product-based' },
  { value: 'MEAL', label: 'Meal-based' },
];
