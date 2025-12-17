import { Unit } from './unit';

export type Product = {
  id: number;
  name: string;
  unit: Unit;
  gramsPerUnit: number;
  kcal100g: number;
  protein100g: number;
  carbs100g: number;
  fat100g: number;
  ownerId: number;
};

export type ProductWithPreference = {
  product: Product;
  preference: number;
  favourite: boolean;
};
