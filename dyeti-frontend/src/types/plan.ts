import { Product } from './product';

export type PlanProduct = {
  product: Product;
  quantity: number;
};

export type Plan = {
  id: number;
  name: string;
  description: string;
  caloriesTarget: number;
  proteinsTarget: number;
  carbsTarget: number;
  fatsTarget: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  createdAt: string;
  products: PlanProduct[];
};
