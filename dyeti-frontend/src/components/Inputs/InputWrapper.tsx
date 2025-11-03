import { InputContainer, InputLabel, InputError } from './Inputs.styles.ts';

type Props = {
  label?: string;
  error?: string;
  width?: string;
  children: React.ReactNode;
};

const InputWrapper = ({ label, error, width, children }: Props) => (
  <InputContainer hasError={!!error} width={width}>
    {label && <InputLabel>{label}</InputLabel>}
    {children}
    {error && <InputError>{error}</InputError>}
  </InputContainer>
);

export default InputWrapper;
