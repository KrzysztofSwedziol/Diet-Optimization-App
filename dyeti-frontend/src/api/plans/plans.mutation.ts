import { apiRequest } from '../axios.ts';
import { HttpMethod, PlanGenerationRequest } from '../types.ts';

export const checkPlanNameAvailability = (name: string) => {
  return apiRequest<boolean>(HttpMethod.GET, '/api/plans/available', null, { params: { name: name.trim() } });
};
export const generateProductBasePlan = async (data: PlanGenerationRequest) => {
  return await apiRequest<string>(HttpMethod.POST, '/api/plans', data);
};

const PLAN_MUTATION = {
  CHECK_AVAILABLE: checkPlanNameAvailability,
  GENERATE_PRODUCT: generateProductBasePlan,
};

export default PLAN_MUTATION;
