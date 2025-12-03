import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Error = styled.p`
  color: ${({ theme }) => theme.colors.danger[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
