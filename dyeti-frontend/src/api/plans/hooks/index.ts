import { useMutation } from '@tanstack/react-query';
import KEYS from '../plans.keys.ts';
import PLAN_MUTATION from '../plans.mutation.ts';
import { Plan, PlanGenerationRequest } from '../../types.ts';

export const useCheckAvailability = () => {
  return useMutation({
    mutationKey: KEYS.AVAILABLE,
    mutationFn: PLAN_MUTATION.CHECK_AVAILABLE,
  });
};
export const useGenerateProductPlan = () => {
  //const qc = useQueryClient();
  return useMutation<Plan, unknown, PlanGenerationRequest>({
    mutationKey: KEYS.GENERATE_PRODUCT,
    mutationFn: PLAN_MUTATION.GENERATE_PRODUCT,
    onSuccess: (plan) => {
      console.log("New plan: ", plan);
      // opcjonalnie: podłóż do cache / odśwież listę planów
      // qc.invalidateQueries({ queryKey: KEYS.LIST });
      // albo np. qc.setQueryData([...KEYS.DETAIL, plan.id], plan);
    },
  });
};


