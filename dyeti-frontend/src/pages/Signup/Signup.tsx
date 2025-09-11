import { useState } from 'react';
import * as Ui from '../Login/Login.styles.ts'; // korzystamy z tych samych stylów
import { useAuth } from '../../components/providers/AuthProvider.tsx';
import Input from '../../components/Input/Input.tsx';
import dyeti from '../../assets/dyeti-happy.svg';
import { AppButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../components/Typography/PageTitle.tsx';
import { PageDescription } from '../../components/Typography/PageDescription.tsx';

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    global?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email) return setErrors({ email: 'Email is required' });
    if (!username) return setErrors({ username: 'Username is required' });
    if (!password) return setErrors({ password: 'Password is required' });
    if (password !== confirmPassword) {
      return setErrors({ confirmPassword: 'Passwords do not match' });
    }
    if (!acceptedTerms) {
      return setErrors({ terms: 'You must accept the Terms of Service' });
    }

    try {
      await register({ email, username, password });
      navigate('/account');
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ global: `Registration failed: ${err.message}` });
      } else {
        setErrors({ global: 'An unknown error occurred' });
      }
    }
  };

  return (
    <Ui.Container>
      <Ui.Card>
        <Ui.LogoContainer>
          <Ui.Logo src={dyeti} alt="DYeti logo" />
        </Ui.LogoContainer>

        <PageTitle>Let’s get started!</PageTitle>
        <PageDescription>Create an account to unlock your personalized diet plans.</PageDescription>

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
            label="USERNAME"
            type="text"
            placeholder="yeti_123"
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

          <Input
            label="CONFIRM PASSWORD"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />
          <Ui.OptionsContainer>
            <Ui.RememberMe>
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={e => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                I have read and agree to the{' '}
                <Ui.Link href="/terms" target="_blank">
                  Terms of Service
                </Ui.Link>
                .
              </label>
            </Ui.RememberMe>
          </Ui.OptionsContainer>
          {errors.terms && <Ui.Error>{errors.terms}</Ui.Error>}

          {errors.global && <Ui.Error>{errors.global}</Ui.Error>}

          <AppButton fullWidth animation type="submit">
            Sign Up
          </AppButton>
        </form>

        <Ui.Footer>
          Already have an account? <a href="/login">Login</a>
        </Ui.Footer>
      </Ui.Card>
    </Ui.Container>
  );
};

export default Signup;
