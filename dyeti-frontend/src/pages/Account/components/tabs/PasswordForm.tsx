import * as Ui from './AccountTabs.styles.ts';
import Input from '@/components/Input/Input.tsx';
import PasswordRequirements from '@/pages/Account/components/tabs/PasswordRequirements.tsx';
import { AppButton } from '@/components';
import { usePasswordRequirements } from '@/pages/Account/hooks/CheckPasswordReq.tsx';
import { useState } from 'react';

const PasswordForm = () => {
  const { requirements, handleNewPasswordChange, handleCurrentPasswordChange, handleConfirmPasswordChange } =
    usePasswordRequirements({ minLength: 8 });
  const onChangePwd = (key: keyof Pwd) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPwd(s => {
      const next = { ...s, [key]: val };
      pwdActions[key](val, next);
      return next;
    });
  };

  const [pwd, setPwd] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [pwdSubmitting, setPwdSubmitting] = useState(false);
  const [pwdGlobalError, setPwdGlobalError] = useState<string>('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdSubmitting(true);
    setPwdGlobalError('');
  };
  type Pwd = typeof pwd;
  const pwdActions: Record<keyof Pwd, (val: string, next: Pwd) => void> = {
    currentPassword: val => {
      handleCurrentPasswordChange(val);
    },
    newPassword: (val, next) => {
      handleNewPasswordChange(val, next.confirmPassword); // (new, confirm)
      handleConfirmPasswordChange(val, next.confirmPassword); // keep match in sync
    },
    confirmPassword: (val, next) => {
      handleConfirmPasswordChange(next.newPassword, val); // (new, confirm)
    },
  };
  return (
    <>
      <Ui.PwdForm onSubmit={handleChangePassword}>
        <Ui.FormGridColumn>
          <Input
            label="CURRENT PASSWORD"
            type="password"
            placeholder="••••••••"
            value={pwd.currentPassword}
            onChange={onChangePwd('currentPassword')}
            paddingY={12}
          />
          <Input
            label="NEW PASSWORD"
            type="password"
            placeholder="At least 8 characters"
            value={pwd.newPassword}
            onChange={onChangePwd('newPassword')}
            paddingY={12}
          />
          <Input
            label="CONFIRM NEW PASSWORD"
            type="password"
            placeholder="Repeat new password"
            value={pwd.confirmPassword}
            onChange={onChangePwd('confirmPassword')}
            paddingY={12}
          />
        </Ui.FormGridColumn>
      </Ui.PwdForm>
      <Ui.PwdActions>
        <AppButton type="submit" disabled={pwdSubmitting}>
          {pwdSubmitting ? 'Changing…' : 'Change password'}
        </AppButton>
        {pwdGlobalError && <Ui.Error>{pwdGlobalError}</Ui.Error>}
        <PasswordRequirements requirements={requirements} />
      </Ui.PwdActions>
    </>
  );
};

export default PasswordForm;
