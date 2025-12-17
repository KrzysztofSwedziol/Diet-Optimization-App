import { Product } from './product';

export type Meal = {
  id: string;
  orderInDay: number;
  products: MealProduct[];
  recipes: Recipe[];
};

export type MealProduct = {
  product: Product;
  quantity: number;
};

export type Recipe = {
  id: string;
  recipeName: string;
  description: string;
  steps: string[];
};
