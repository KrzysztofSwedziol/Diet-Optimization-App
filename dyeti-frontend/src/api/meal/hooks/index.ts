import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import queries from '../meal.queries';
import keys from '../meal.keys';
import { MealsGenerationRequest } from '../types';
import mutations from '../meal.mutations';

export const useGetMealsByPlan = (planId: number) => {
  return useQuery({
    queryKey: keys.details(planId),
    queryFn: () => queries.getMealsByPlan(planId),
    enabled: !!planId,
  });
};

export const useGenerateMeals = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MealsGenerationRequest) => mutations.generateMeals(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: keys.details(variables.planId) });
    },
  });
};
