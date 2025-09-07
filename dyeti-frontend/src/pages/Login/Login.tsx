import { useState } from 'react';
import * as Ui from './Login.styles';
import { useAuth } from '../../components/providers/AuthProvider.tsx';
import Input from '../../components/Input/Input.tsx';
import dyeti from '../../assets/dyeti.svg';
import { AppButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../components/Typography/PageTitle.tsx';
import { PageDescription } from '../../components/Typography/PageDescription.tsx';

const Login = () => {
  const { login } = useAuth(); // z providera
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; global?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!username) return setErrors({ username: 'Email is required' });
    if (!password) return setErrors({ password: 'Password is required' });

    try {
      await login(username, password);
      navigate('/account');
    } catch (err) {
      setErrors({ global: `Invalid email or password ${err.message}` });
    }
  };

  return (
    <Ui.Container>
      <Ui.Card>
        <Ui.LogoContainer>
          <Ui.Logo src={dyeti} alt="DYeti logo" />
        </Ui.LogoContainer>
        <PageTitle>Welcome back!</PageTitle>
        <PageDescription>Log in to view your diet plans, manage preferences, and more.</PageDescription>

        <form onSubmit={handleSubmit}>
          <Input
            label="USERNAME"
            type="text"
            placeholder="yetiuser"
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
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              <span className="custom-checkbox" />
              <label htmlFor="remember">Remember me</label>
            </Ui.RememberMe>
            <Ui.ForgotPassword href="/forgot-password">Forgot password?</Ui.ForgotPassword>
          </Ui.OptionsContainer>

          <AppButton fullWidth animation type={'submit'}>
            Login
          </AppButton>
          {errors.global && <Ui.Error>{errors.global}</Ui.Error>}
        </form>

        <Ui.Footer>
          Don’t have an account? <a href="/signup">Sign up</a>
        </Ui.Footer>
      </Ui.Card>
    </Ui.Container>
  );
};

export default Login;
