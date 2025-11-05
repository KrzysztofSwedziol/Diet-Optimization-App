import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import planKeys from '../plan.keys';
import planQueries from '../plan.queries';
import planMutations from '../plan.mutations';
import { Plan } from '@/types';

export const useGetPlans = () => {
  return useQuery({
    queryKey: planKeys.lists(),
    queryFn: planQueries.getPlans,
  });
};

export const useGetPlan = (planId: number) => {
  return useQuery({
    queryKey: planKeys.detail(planId),
    queryFn: () => planQueries.getPlan(planId),
    enabled: !!planId,
  });
};

export const useDeletePlan = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => planMutations.deletePlan(planId),
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: planKeys.lists() }),
        queryClient.cancelQueries({ queryKey: planKeys.detail(planId) }),
      ]);
      const previousPlans = queryClient.getQueryData<Plan[]>(planKeys.lists());
      queryClient.setQueryData<Plan[]>(planKeys.lists(), old => {
        if (!old) return old;
        return old.filter(plan => plan.id !== planId);
      });
      return { previousPlans };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPlans) {
        queryClient.setQueryData(planKeys.lists(), context.previousPlans);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planKeys.detail(planId) });
    },
  });
};
