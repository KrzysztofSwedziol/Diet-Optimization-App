import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import KEYS from '@/api/user/user.keys.ts';
import USER_QUERIES from '@/api/user/user.queries.ts';
import USER_MUTATION from '@/api/user/user.mutation.ts';
import AUTH_KEYS from '@/api/auth/auth.keys.ts';
import AUTH_MUTATION from '@/api/auth/auth.mutation.ts';

export const useUserStats = () => {
  return useQuery({
    queryKey: KEYS.GET_STATS,
    queryFn: USER_QUERIES.GET_USER_STATS,
    staleTime: 60_000,
    retry: false,
  });
};

export const useChangePassword = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: KEYS.CHANGE_PASSWORD,
    mutationFn: USER_MUTATION.CHANGE_PASSWORD,
    onSuccess: async () => {
      await qc.fetchQuery({ queryKey: AUTH_KEYS.CHECK, queryFn: AUTH_MUTATION.CHECK });
    },
  });
};
export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: KEYS.UPDATE_PROFILE,
    mutationFn: USER_MUTATION.UPDATE_PROFILE,
    onSuccess: async () => {
      // po zapisie odśwież aktualnego usera
      await qc.fetchQuery({ queryKey: AUTH_KEYS.CHECK, queryFn: AUTH_MUTATION.CHECK });
    },
  });
};
