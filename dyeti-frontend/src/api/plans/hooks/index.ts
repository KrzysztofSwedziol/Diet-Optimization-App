import { useMutation } from '@tanstack/react-query';
import KEYS from '../plans.keys.ts';
import PLAN_MUTATION from '../plans.mutation.ts';

export const useCheckAvailability = () => {
  return useMutation({
    mutationKey: KEYS.AVAILABLE,
    mutationFn: PLAN_MUTATION.CHECK_AVAILABLE,
  });
};
