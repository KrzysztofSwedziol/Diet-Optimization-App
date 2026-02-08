import { styled } from 'styled-components';

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 8px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.neutrals[900]};
`;
