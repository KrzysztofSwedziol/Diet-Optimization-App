import { apiRequest } from '../axios';
import { HttpMethod } from '../types';
import { MealsGenerationRequest } from './types';

const generateMeals = async ({ planId, numberOfMeals }: MealsGenerationRequest) => {
  return await apiRequest<string>(HttpMethod.POST, '/api/meal/distribute', null, {
    params: {
      planId,
      mealQuantity: numberOfMeals,
    },
    timeout: 60 * 1000,
  });
};

const mutations = {
  generateMeals,
};

export default mutations;
