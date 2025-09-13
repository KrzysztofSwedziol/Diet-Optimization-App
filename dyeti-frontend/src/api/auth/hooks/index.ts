import { useMutation } from '@tanstack/react-query';
import KEYS from '../auth.keys';
import AUTH_MUTATION from '../auth.mutation';

export const useLogIn = () => {
  return useMutation({
    mutationKey: KEYS.LOGIN,
    mutationFn: AUTH_MUTATION.LOGIN,
    onSuccess: data => {
      // TODO: Handle successful login
      console.log('Login successful:', data.message);
    },
  });
};
