import { InputContainer, InputLabel, InputError } from './Inputs.styles.tsx';

type Props = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

const InputWrapper = ({ label, error, children }: Props) => (
  <InputContainer hasError={!!error}>
    <InputLabel>{label}</InputLabel>
    {children}
    {error && <InputError>{error}</InputError>}
  </InputContainer>
);

export default InputWrapper;
