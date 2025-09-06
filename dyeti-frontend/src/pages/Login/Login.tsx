import { useState } from 'react';
import * as Ui from './Login.styles';
import { useAuth } from '../../components/providers/AuthProvider.tsx';
import Input from '../../components/Input/Input.tsx';
import dyeti from '../../assets/dyeti.svg';

const Login = () => {
  const { login } = useAuth(); // z providera
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; global?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email) return setErrors({ email: 'Email is required' });
    if (!password) return setErrors({ password: 'Password is required' });

    try {
      await login(email, password);
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
        <Ui.Title>Welcome back!</Ui.Title>
        <Ui.Subtitle>Log in to view your diet plans, manage preferences, and more.</Ui.Subtitle>

        <form onSubmit={handleSubmit}>
          <Input
            label="EMAIL"
            type="email"
            placeholder="yeti@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
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
            <Ui.ForgotPassword href="/forgot-password">Forgot password?</Ui.ForgotPassword>

            <Ui.RememberMe>
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
              Remember me
            </Ui.RememberMe>
          </Ui.OptionsContainer>

          {errors.global && <p style={{ color: '#EF4444' }}>{errors.global}</p>}

          <Ui.Button type="submit">Login</Ui.Button>
        </form>

        <Ui.Footer>
          Don’t have an account? <a href="/signup">Sign up</a>
        </Ui.Footer>
      </Ui.Card>
    </Ui.Container>
  );
};

export default Login;
