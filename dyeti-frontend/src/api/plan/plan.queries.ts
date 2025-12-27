import { Plan } from '@/types';
import { apiRequest } from '../axios';
import { HttpMethod } from '../types';

const getPlans = async () => {
  try {
    const response = await apiRequest<Plan[]>(HttpMethod.GET, '/api/plans');
    return response;
  } catch (error) {
    throw error;
  }
};

const getPlan = async (planId: number) => {
  try {
    const response = await apiRequest<Plan>(HttpMethod.GET, `/api/plans/${planId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const getTopPlans = async (limit: number) => {
  try {
    const response = await apiRequest<Plan[]>(HttpMethod.GET, `/api/plans/top/${limit}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const checkPlanNameAvailability = (name: string) => {
  return apiRequest<boolean>(HttpMethod.GET, '/api/plans/available', null, { params: { name } });
};

const queries = {
  getPlans,
  getPlan,
  checkPlanNameAvailability,
  getTopPlans,
};

export default queries;
