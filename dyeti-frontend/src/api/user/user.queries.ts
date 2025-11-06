import { HttpMethod, UserStats } from '@/api/types.ts';
import { apiRequest } from '@/api/axios.ts';

const getUserStats = async () => {
  try {
    return await apiRequest<UserStats>(HttpMethod.GET, '/api/user/stats');
  } catch (error) {
    throw error;
  }
};

const USER_QUERIES = {
  GET_USER_STATS: getUserStats,
};
export default USER_QUERIES;
