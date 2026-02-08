import { styled } from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.warning[100]};
  border: 1px solid ${({ theme }) => theme.colors.warning[300]};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.warning[600]};
`;

export const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
`;
