import * as Ui from './Checkbox.styles';

type Props = {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ label, checked, onChange, disabled = false }: Props) => {
  return (
    <Ui.StyledLabel $disabled={disabled}>
      <Ui.StyledCheckbox checked={checked} onChange={onChange} disabled={disabled} />
      {label}
    </Ui.StyledLabel>
  );
};

export default Checkbox;
