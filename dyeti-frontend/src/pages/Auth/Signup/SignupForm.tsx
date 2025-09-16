import { useState } from 'react';
import * as Ui from '../Auth.styles.ts';
import Input from '../../../components/Inputs/Input/Input.tsx';
import { AppButton } from '../../../components';
import { useAuth } from '../../../components/providers/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';
import { Gender } from '../../../api/types.ts';
import Select from '../../../components/Inputs/Select/Select.tsx';
import { FormGrid } from '../Auth.styles.ts';

const SignupForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
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
    if (!gender) return setErrors({ gender: 'Gender is required' });
    if (!acceptedTerms) {
      return setErrors({ terms: 'You must accept the Terms of Service' });
    }

    try {
      await register({ email, username, password, gender });
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
    <FormGrid onSubmit={handleSubmit}>
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
      <div>
        <Select
          label="GENDER"
          value={gender}
          onChange={e => setGender(e.target.value as Gender)}
          options={[
            { value: Gender.MALE, label: 'Male' },
            { value: Gender.FEMALE, label: 'Female' },
          ]}
          error={errors.gender}
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
      </div>

      <AppButton fullWidth animation type="submit">
        Sign Up
      </AppButton>
    </FormGrid>
  );
};

export default SignupForm;
