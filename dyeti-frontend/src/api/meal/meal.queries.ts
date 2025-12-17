import { Meal } from '@/types';
import { apiRequest } from '../axios';
import { HttpMethod } from '../types';

const getMealsByPlan = async (planId: number) => {
  const response = await apiRequest<Meal[]>(HttpMethod.GET, `/api/meal/plan/${planId}`);
  return response;
};

const queries = {
  getMealsByPlan,
};

export default queries;
