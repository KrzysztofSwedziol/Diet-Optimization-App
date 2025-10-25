import { useState } from 'react';
import * as Ui from '../Auth.styles.ts';
import Input from '../../../components/Input/Input.tsx';
import { AppButton, Checkbox } from '@/components';
import { useAuth } from '../../../components/providers/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; global?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!username) return setErrors({ username: 'Username is required' });
    if (!password) return setErrors({ password: 'Password is required' });

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ global: `Invalid username or password: ${err.message}` });
      } else {
        setErrors({ global: 'An unknown error occurred' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="USERNAME"
        type="text"
        placeholder="Yeti123"
        value={username}
        onChange={e => setUsername(e.target.value)}
        error={errors.username}
      />

      <Input
        label="PASSWORD"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={errors.password}
      />

      <Ui.OptionsContainer>
        <Ui.RememberMe>
          <Checkbox label="Remember me" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
        </Ui.RememberMe>
        <Ui.ForgotPassword href="/forgot-password">Forgot password?</Ui.ForgotPassword>
      </Ui.OptionsContainer>

      <AppButton fullWidth type="submit">
        Login
      </AppButton>

      {errors.global && <Ui.Error>{errors.global}</Ui.Error>}
    </form>
  );
};

export default LoginForm;
