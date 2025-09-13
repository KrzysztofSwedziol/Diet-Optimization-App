import React from 'react';
import { useTheme } from 'styled-components';
import './AppButton.css';

type Size = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
  style,
  size = 'md',
  icon,
  iconPosition = 'left',
  reversed = false,
  disabled = false,
  animation = false,
  fullWidth = false,
  onClick,
}) => {
  const theme = useTheme();
  const justifyContent = icon ? 'space-between' : 'center';
  const backgroundColor = reversed ? theme.colors.primary[100] : theme.colors.primary[600];
  const textColor = reversed ? theme.colors.primary[600] : theme.colors.primary[100];
  const padding = theme.buttonPadding[size];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  const classNames = ['button', animation ? 'button-pulse' : '', fullWidth ? 'full' : '', disabled ? 'disabled' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={classNames}
      style={
        {
          ...style,
          '--hover-bg': textColor,
          '--button-bg': backgroundColor,
          '--text-color': textColor,
          '--padding': padding,
          '--box-shadow': theme.shadows.md,
          '--font-size': theme.typography.fontSize[size],
          '--justify': justifyContent,
          '--border-radius': theme.borderRadius.lg,
        } as React.CSSProperties
      }
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default AppButton;
