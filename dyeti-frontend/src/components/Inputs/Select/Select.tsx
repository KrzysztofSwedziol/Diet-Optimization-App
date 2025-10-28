import { SelectWrapper, SelectLabel, SelectField, SelectError } from './Select.styles';

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  paddingY?: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
};

const Select = ({ paddingY, label, value, onChange, options, error }: Props) => {
  return (
    <SelectWrapper>
      <SelectLabel>{label}</SelectLabel>
      <SelectField paddingy={paddingY} value={value} onChange={onChange} $haserror={!!error}>
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
