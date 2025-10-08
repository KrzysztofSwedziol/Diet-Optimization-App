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
    mutationFn: AUTH_MUTATION.LOGIN,
    onSuccess: async () => {
      await qc.fetchQuery({ queryKey: AUTH_KEYS.CHECK, queryFn: AUTH_MUTATION.CHECK });
    },
  });
};

export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: AUTH_KEYS.REGISTER,
    mutationFn: AUTH_MUTATION.REGISTER,
    onSuccess: user => qc.setQueryData(AUTH_KEYS.CHECK, user),
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
