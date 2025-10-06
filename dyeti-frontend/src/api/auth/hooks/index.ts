import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AUTH_MUTATION from '../auth.mutation';
import AUTH_KEYS from '../auth.keys';

import { User } from '../../types.ts';

export const useCheckAuth = () =>
  useQuery<User | null>({
    queryKey: AUTH_KEYS.CHECK,
    queryFn: AUTH_MUTATION.CHECK,
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useLogIn = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: AUTH_KEYS.LOGIN,
    mutationFn: AUTH_MUTATION.LOGIN, // returns LoginResponse (no user)
    onSuccess: async () => {
      // immediately refresh user from /auth/check
      await qc.fetchQuery({ queryKey: AUTH_KEYS.CHECK, queryFn: AUTH_MUTATION.CHECK });
    },
  });
};

export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: AUTH_KEYS.REGISTER,
    mutationFn: AUTH_MUTATION.REGISTER, // often returns created user (or not)
    onSuccess: async (maybeUser: User | undefined) => {
      if (maybeUser) {
        qc.setQueryData<User | null>(AUTH_KEYS.CHECK, maybeUser);
      } else {
        await qc.fetchQuery({ queryKey: AUTH_KEYS.CHECK, queryFn: AUTH_MUTATION.CHECK });
      }
    },
  });
};

export const useLogOut = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: AUTH_KEYS.LOGOUT,
    mutationFn: AUTH_MUTATION.LOGOUT,
    onSuccess: () => {
      qc.setQueryData<User | null>(AUTH_KEYS.CHECK, null);
    },
  });
};
