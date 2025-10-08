import { useQuery } from '@tanstack/react-query';
import KEYS from '@/api/user/user.keys.ts';
import USER_QUERIES from '@/api/user/user.queries.ts';

export const useUserStats = () => {
  return useQuery({
    queryKey: KEYS.GET_STATS,
    queryFn: USER_QUERIES.GET_USER_STATS,
    staleTime: 60_000,
    retry: false,
  });
};
