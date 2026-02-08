import { KCAL_PER_G } from '../constants/constants.ts';

export const gramsFromCalories = (calories: number, proportion: number, kcalPerGram: number, decimals = 0) =>
  Number(((calories * proportion) / kcalPerGram).toFixed(decimals));

export const calculateCalories = (carbs: number, protein: number, fats: number): number =>
  carbs * KCAL_PER_G.CARBS + protein * KCAL_PER_G.PROTEIN + fats * KCAL_PER_G.FATS;
