import { useQuery } from '@tanstack/react-query';
import KEYS from '../plan.keys';
import PLAN_QUERIES from '../plan.queries';

export const useGetPlans = () => {
  return useQuery({
    queryKey: KEYS.GET_PLANS,
    queryFn: PLAN_QUERIES.GET_PLANS,
  });
};
