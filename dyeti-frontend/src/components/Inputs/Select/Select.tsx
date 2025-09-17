import { SelectField } from './Select.styles.ts';
import InputWrapper from '../InputWrapper.tsx';

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
};

const Select = ({ label, value, onChange, options, error }: Props) => {
  return (
    <InputWrapper label={label} error={error}>
      <SelectField value={value} onChange={onChange} hasError={!!error}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </SelectField>
    </InputWrapper>
  );
};

export default Select;
