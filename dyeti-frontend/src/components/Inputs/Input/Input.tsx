import { InputField } from './Input.styles.ts';
import InputWrapper from '../InputWrapper.tsx';

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const Input = ({ label, type = 'text', placeholder, value, onChange, error }: Props) => (
  <InputWrapper label={label} error={error}>
    <InputField type={type} placeholder={placeholder} value={value} onChange={onChange} hasError={!!error} />
  </InputWrapper>
);

export default Input;
