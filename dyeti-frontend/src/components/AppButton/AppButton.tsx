import React from 'react';
import { StyledButton } from './AppButton.styles.ts';

export type Size = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  fullWidth?: boolean;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  reversed?: boolean;
  disabled?: boolean;
  animation?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  children,
  size = 'md',
  icon,
  iconPosition = 'left',
  reversed = false,
  disabled = false,
  animation = false,
  fullWidth = false,
  onClick,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <StyledButton
      type="button"
      onClick={handleClick}
      disabled={disabled}
      fullwidth={fullWidth}
      animation={animation}
      reversed={reversed}
      icon={!!icon}
      size={size}
      {...rest}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </StyledButton>
  );
};

export default AppButton;
