import { styled, keyframes } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div<{ $size?: number }>`
  border: ${({ $size = 40 }) => Math.max(2, $size / 8)}px solid ${({ theme }) => theme.colors.neutrals[300]};
  border-top: ${({ $size = 40 }) => Math.max(2, $size / 8)}px solid ${({ theme }) => theme.colors.primary[700]};
  border-radius: 50%;
  width: ${({ $size = 40 }) => $size}px;
  height: ${({ $size = 40 }) => $size}px;
  animation: ${spin} 1s linear infinite;
`;
