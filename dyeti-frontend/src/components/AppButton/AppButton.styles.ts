import { styled, keyframes, css } from 'styled-components';
import { Size } from '@/components/AppButton/AppButton.tsx';

const pulseLoop = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.08);
    }
    80% {
        transform: scale(0.96);
    }
    100% {
        transform: scale(1);
    }
`;

export const StyledButton = styled.button<{
  fullwidth: boolean;
  animation: boolean;
  reversed: boolean;
  icon: boolean;
  size: Size;
}>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

  justify-content: ${({ icon }) => (icon ? 'space-between' : 'center')};

  margin: auto;
  padding: ${({ theme, size }) => theme.buttonPadding[size]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  font-size: ${({ theme, size }) => theme.typography.fontSize[size]};
  line-height: 1;
  color: ${({ theme, reversed }) => (reversed ? theme.colors.primary[600] : theme.colors.primary[100])};

  background: ${({ theme, reversed }) => (reversed ? theme.colors.primary[100] : theme.colors.primary[600])};
  box-shadow: ${({ theme }) => theme.shadows.md};

  ${({ fullwidth }) => fullwidth && 'width: 100%;'}

  &:hover {
    background-color: ${({ theme, reversed }) => (reversed ? theme.colors.primary[200] : theme.colors.primary[700])};
    border-color: ${({ theme, reversed }) => (reversed ? theme.colors.primary[600] : 'transparent')};

    ${({ animation }) =>
      animation &&
      css`
        animation: ${pulseLoop} 1.5s linear infinite both;
      `}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
