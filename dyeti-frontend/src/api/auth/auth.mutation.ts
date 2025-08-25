import { apiRequest } from '../axios';
import { HttpMethod } from '../types';
import { LoginRequest, LoginResponse } from './types';

const logIn = async ({ username, password }: LoginRequest) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  return apiRequest<LoginResponse>(HttpMethod.POST, 'auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

const AUTH_MUTATION = {
  LOGIN: logIn,
};

export default AUTH_MUTATION;
