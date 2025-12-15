import { apiRequest } from '../axios';
import { HttpMethod } from '../types';
import { MealsGenerationRequest } from './types';

const generateMeals = async (data: MealsGenerationRequest) => {
  return await apiRequest<string>(HttpMethod.POST, '/api/meal/distribute', data);
};

const mutations = {
  generateMeals,
};

export default mutations;
