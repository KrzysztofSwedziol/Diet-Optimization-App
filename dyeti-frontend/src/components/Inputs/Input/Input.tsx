import { InputWrapper, InputLabel, InputField, InputError } from './Input.styles';

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  paddingY?: number;
};

const Input = ({ label, type = 'text', placeholder, value, onChange, error, paddingY }: Props) => {
  return (
    <InputWrapper $haserror={!!error}>
      <InputLabel>{label}</InputLabel>
      <InputField
        paddingy={paddingY}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        $haserror={!!error}
      />
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};

export default Input;
