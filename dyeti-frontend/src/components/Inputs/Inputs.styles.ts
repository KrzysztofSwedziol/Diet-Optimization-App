import { styled } from 'styled-components';

export const InputContainer = styled.div<{ hasError?: boolean; width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || '100%'};
`;

export const InputLabel = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 2px;
  color: ${({ theme }) => theme.colors.neutrals[900]};
`;
export const InputError = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.danger[500]};
  margin: 2px;
  font-style: italic;
`;
