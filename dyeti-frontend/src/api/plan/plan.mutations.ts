import { Plan } from '@/types';
import { apiRequest } from '../axios';
import { HttpMethod, PlanGenerationRequest } from '../types';

const generatePlan = async (data: PlanGenerationRequest) => {
  return await apiRequest<string>(HttpMethod.POST, '/api/plans', data);
};

const deletePlan = async (planId: number) => {
  const response = await apiRequest<Plan>(HttpMethod.DELETE, `/api/plans/${planId}`);
  return response;
};

const mutations = {
  generatePlan,
  deletePlan,
};

export default mutations;
