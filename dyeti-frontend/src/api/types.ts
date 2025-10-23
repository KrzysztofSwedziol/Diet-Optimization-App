export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}
export type ApiErrorBody = {
  errorField: string;
  errorMessage: string;
};

export type ApiError = {
  status: number;
  body: ApiErrorBody;
};
export type LoginRequest = {
  username: string;
  password: string;
};

export type GenericResponse = {
  message: string;
};

export type LoginResponse = {
  message: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  gender: Gender;
};

export type LogoutResponse = {
  message: string;
};

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type User = {
  id: number;
  username: string;
  email: string;
  age: number | null;
  gender: Gender | null;
  height: number | null;
  weight: number | null;
  energyReq: number | null;
  proteinReq: number | null;
  carbsReq: number | null;
  fatReq: number | null;
  role: Role;
};
export type UpdateProfileRequest = {
  username: string;
  email: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
};

export type UserStats = {
  productPrefsCount: number;
  plansCount: number;
  createdRecipesCount: number;
  createdProductsCount: number;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};
