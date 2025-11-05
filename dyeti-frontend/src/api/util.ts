import { Plan, PlanApi } from './types.ts';

export const mapPlanDTO = (api: PlanApi): Plan => ({
  ...api,
  planDate: new Date(api.planDate),
});
