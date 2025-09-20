import { apiRequest } from '../axios.ts';
import { HttpMethod, Plan, PlanApi, PlanGenerationRequest } from '../types.ts';
import { mapPlanDTO } from '../util.ts';

export const checkPlanNameAvailability = (name: string) => {
  return apiRequest<boolean>(HttpMethod.GET, '/api/plans/available', null, { params: { name: name.trim() } });
};
export const generateProductBasePlan = async (data: PlanGenerationRequest): Promise<Plan> => {
  const dto = await apiRequest<PlanApi>(HttpMethod.POST, '/api/plans/products/new', data);
  return mapPlanDTO(dto);
};

const PLAN_MUTATION = {
  CHECK_AVAILABLE: checkPlanNameAvailability,
  GENERATE_PRODUCT: generateProductBasePlan,
};

export default PLAN_MUTATION;
