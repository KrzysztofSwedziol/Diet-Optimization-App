import { useState } from 'react';

export type NewPwdReqState = {
  providedNew: boolean;
  providedCurrent: boolean;
  minLength: boolean;
  special: boolean;
  passwordMatch: boolean;
};

export type NewPwdOptions = {
  minLength?: number;
  specialCharRegex?: RegExp;
};

export function usePasswordRequirements(opts: NewPwdOptions = {}) {
  const { minLength = 8, specialCharRegex = /[^A-Za-z0-9]/ } = opts;

  const [requirements, setRequirements] = useState<NewPwdReqState>({
    providedNew: false,
    providedCurrent: false,
    passwordMatch: false,
    minLength: false,
    special: false,
  });

  const handleNewPasswordChange = (newPwd: string, confirmPwd: string) => {
    const next: NewPwdReqState = {
      providedNew: newPwd.length > 0,
      minLength: newPwd.length >= minLength,
      special: specialCharRegex.test(newPwd),
      providedCurrent: requirements.providedCurrent,
      passwordMatch: newPwd === confirmPwd,
    };
    setRequirements(next);
    return next;
  };
  const handleCurrentPasswordChange = (currentPwd: string) => {
    return setRequirements(prev => ({
      ...prev,
      providedCurrent: currentPwd.length > 0,
    }));
  };
  const handleConfirmPasswordChange = (newPwd: string, confirmPwd: string) => {
    return setRequirements(prev => ({
      ...prev,
      passwordMatch: newPwd === confirmPwd,
    }));
  };

  return { requirements, handleNewPasswordChange, handleCurrentPasswordChange, handleConfirmPasswordChange };
}
