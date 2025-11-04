import { ReactNode } from 'react';
import * as Ui from './Checkbox.styles';

type BaseProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
};

type Props = (BaseProps & { label: string; children?: never }) | (BaseProps & { label?: never; children: ReactNode });

const Checkbox = ({ label, children, checked, onChange, disabled = false }: Props) => {
  return (
    <Ui.StyledLabel $disabled={disabled}>
      <Ui.StyledCheckbox checked={checked} onChange={onChange} disabled={disabled} />
      <Ui.Content>{children ? children : label}</Ui.Content>
    </Ui.StyledLabel>
  );
};

export default Checkbox;
