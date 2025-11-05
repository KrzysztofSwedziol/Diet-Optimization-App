import { Plan } from '@/types';
import { apiRequest } from '../axios';
import { HttpMethod } from '../types';

const deletePlan = async (planId: number) => {
  try {
    const response = await apiRequest<Plan>(HttpMethod.DELETE, `/api/plans/${planId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const mutations = {
  deletePlan,
};

export default mutations;
