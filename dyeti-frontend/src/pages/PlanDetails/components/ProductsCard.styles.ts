import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;
