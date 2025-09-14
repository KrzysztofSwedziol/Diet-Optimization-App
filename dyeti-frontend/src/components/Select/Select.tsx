import { SelectWrapper, SelectLabel, SelectField, SelectError } from './Select.styles';

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
    <SelectWrapper hasError={!!error}>
      <SelectLabel>{label}</SelectLabel>
      <SelectField value={value} onChange={onChange} hasError={!!error}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </SelectField>
      {error && <SelectError>{error}</SelectError>}
    </SelectWrapper>
  );
};

export default Select;
