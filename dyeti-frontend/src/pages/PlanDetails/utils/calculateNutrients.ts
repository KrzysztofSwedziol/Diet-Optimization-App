import { Product } from '@/types';

export const calculateNutrients = (product: Product, quantity: number) => {
  const { gramsPerUnit, kcal100g, protein100g, carbs100g, fat100g } = product;

  const calories = (quantity * gramsPerUnit * kcal100g) / 100;
  const protein = (quantity * gramsPerUnit * protein100g) / 100;
  const carbs = (quantity * gramsPerUnit * carbs100g) / 100;
  const fat = (quantity * gramsPerUnit * fat100g) / 100;

  return {
    calories,
    protein,
    carbs,
    fat,
  };
};
