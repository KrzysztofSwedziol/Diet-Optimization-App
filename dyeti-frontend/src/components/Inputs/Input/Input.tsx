import { InputHTMLAttributes } from 'react';
import { InputWrapper, InputLabel, InputField, InputError, RequiredIndicator } from './Input.styles';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  paddingY?: number;
};

const Input = ({ label, type = 'text', placeholder, value, onChange, error, paddingY, ...props }: Props) => {
  return (
    <InputWrapper $haserror={!!error}>
      <InputLabel>
        {label}
        {props.required && <RequiredIndicator>*</RequiredIndicator>}
      </InputLabel>
      <InputField
        paddingy={paddingY}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        $haserror={!!error}
        {...props}
      />
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};

export default Input;
