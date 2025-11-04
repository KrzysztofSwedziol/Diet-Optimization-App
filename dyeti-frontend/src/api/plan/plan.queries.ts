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

const queries = {
  getPlans,
  getPlan,
};

export default queries;
