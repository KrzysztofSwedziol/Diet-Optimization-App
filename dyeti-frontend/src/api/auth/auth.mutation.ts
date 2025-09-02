import { apiRequest } from '../axios';
import { HttpMethod } from '../types';
import { LoginRequest, LoginResponse, User } from './types';

const logIn = async ({ username, password }: LoginRequest) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  return apiRequest<LoginResponse>(HttpMethod.POST, '/auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

const logOut = async () => {
  return apiRequest<{ message: string }>(HttpMethod.POST, '/auth/logout');
};

const register = async (data: { username: string; email: string; password: string }) => {
  return apiRequest(HttpMethod.POST, '/auth/register', data);
};

const checkAuth = async () => {
  return apiRequest<User>(HttpMethod.GET, '/auth/check', undefined, {
    withCredentials: true, // konieczne żeby wysłać JSESSIONID
  });
};

const AUTH_MUTATION = {
  LOGIN: logIn,
  LOGOUT: logOut,
  REGISTER: register,
  CHECK: checkAuth,
};

export default AUTH_MUTATION;
