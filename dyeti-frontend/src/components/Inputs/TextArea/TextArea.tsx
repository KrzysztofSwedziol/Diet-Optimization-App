import { InputTextArea } from './TextArea.styles.tsx';
import InputWrapper from '../InputWrapper.tsx';

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
};

const TextArea = ({ label, placeholder, value, onChange, error }: Props) => (
  <InputWrapper label={label} error={error}>
    <InputTextArea placeholder={placeholder} value={value} onChange={onChange} hasError={!!error} />
  </InputWrapper>
);

export default TextArea;
