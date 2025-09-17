import { styled } from 'styled-components';

export const Shell = styled.div<{ $width?: string }>`
  position: relative;
  width: ${({ $width }) => $width || '100%'};
`;

export const Suffix = styled.span<{ disabled?: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[700]};
  pointer-events: none;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;
