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

const QUERIES = {
  GET_PLANS: getPlans,
};

export default QUERIES;
