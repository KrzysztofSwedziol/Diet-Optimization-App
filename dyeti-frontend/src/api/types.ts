export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
export type LoginRequest = {
  username: string;
  password: string;
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
export type PlanGenerationRequest = {
  name: string;
  description?: string;
  caloriesTarget: number;
  carbsTarget: number;
  proteinTarget: number;
  fatsTarget: number;
};

export type PlanApi = {
  name: string;
  description?: string | null;
  planDate: string;
  caloriesTarget: number;
  proteinsTarget: number;
  carbsTarget: number;
  fatsTarget: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
};
export type Plan = Omit<PlanApi, 'planDate'> & { planDate: Date };

export type FieldErrors = Partial<Record<'name' | 'calories' | 'carbs' | 'protein' | 'fats' | 'method', string>>;
export type GenerateResult =
  | { ok: true; message: string }
  | {
      ok: false;
      code: 'INVALID_INPUT' | 'UNSUPPORTED_METHOD' | 'NAME_TAKEN' | 'NETWORK';
      message: string;
      fieldErrors?: FieldErrors;
    };

export type GenerationMode = 'PRODUCT' | 'MEAL';
