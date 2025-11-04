import { useMutation } from '@tanstack/react-query';
import KEYS from '../plans.keys.ts';
import PLAN_MUTATION from '../plans.mutation.ts';
import { PlanGenerationRequest } from '../../types.ts';

export const useCheckAvailability = () => {
  return useMutation({
    mutationKey: KEYS.AVAILABLE,
    mutationFn: PLAN_MUTATION.CHECK_AVAILABLE,
  });
};
export const useGenerateProductPlan = () => {
  //const qc = useQueryClient();
  return useMutation<string, unknown, PlanGenerationRequest>({
    mutationKey: KEYS.GENERATE_PRODUCT,
    mutationFn: PLAN_MUTATION.GENERATE_PRODUCT,
    onSuccess: message => {
      console.log(message);
      //Eryk zostawia to puste narazie bo nie wiem jak ma do końca
      // wyglądać nasze flow można po sukcesie zrobić nawigacje na account
      // Bo tam jest dostęp do wszystkiego
      // opcjonalnie: podłóż do cache / odśwież listę planów
      // qc.invalidateQueries({ queryKey: KEYS.LIST });
      // albo np. qc.setQueryData([...KEYS.DETAIL, plan.id], plan);
    },
  });
};
