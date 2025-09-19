import { apiRequest } from '../axios.ts';
import { HttpMethod } from '../types.ts';

export const checkPlanNameAvailability = (name: string) => {
  return apiRequest<boolean>(HttpMethod.GET, '/api/plans/available', null, { params: { name: name.trim() } });
};

const PLAN_MUTATION = {
  CHECK_AVAILABLE: checkPlanNameAvailability,
};

export default PLAN_MUTATION;
