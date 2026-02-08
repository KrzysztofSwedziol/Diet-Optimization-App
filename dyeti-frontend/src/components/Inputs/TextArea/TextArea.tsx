import { InputTextArea } from './TextArea.styles.tsx';
import InputWrapper from '../InputWrapper.tsx';
import { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
};

const TextArea = ({ label, placeholder, value, onChange, error, ...props }: Props) => (
  <InputWrapper label={label} error={error}>
    <InputTextArea placeholder={placeholder} value={value} onChange={onChange} hasError={!!error} {...props} />
  </InputWrapper>
);

export default TextArea;
