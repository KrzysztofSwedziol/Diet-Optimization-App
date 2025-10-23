import { ChangePasswordRequest, GenericResponse, HttpMethod, UpdateProfileRequest } from '@/api/types.ts';
import { apiRequest } from '@/api/axios.ts';

const changePassword = async (request: ChangePasswordRequest) => {
  try {
    return await apiRequest<GenericResponse>(HttpMethod.PATCH, '/api/user/change-password', request);
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (request: UpdateProfileRequest) => {
  try {
    return await apiRequest<GenericResponse>(HttpMethod.PATCH, '/api/user', request);
  } catch (error) {
    throw error;
  }
};

const USER_MUTATION = {
  CHANGE_PASSWORD: changePassword,
  UPDATE_PROFILE: updateProfile,
};
export default USER_MUTATION;
