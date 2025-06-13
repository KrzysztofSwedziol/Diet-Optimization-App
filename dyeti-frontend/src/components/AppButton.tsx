import React from 'react';
import { useTheme } from 'styled-components';
import './style/AppButton.css';

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
}

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  style,
  size = 'md',
  icon,
  iconPosition = 'left',
  reversed = false,
  disabled = false,
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

  return (
    <button
      style={{
        padding: padding,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: justifyContent,
        alignItems: 'center',
        fontSize: theme.typography.fontSize[size],
        lineHeight: 1,
        gap: '10px',
        opacity: disabled ? 0.6 : 1,
        boxShadow: theme.shadows.md,
        background: backgroundColor,
        borderRadius: theme.borderRadius.lg,
        color: textColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={disabled ? '' : 'button-pulse'}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};
