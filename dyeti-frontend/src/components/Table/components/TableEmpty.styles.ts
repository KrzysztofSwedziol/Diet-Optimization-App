import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 0;
`;

export const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-align: center;
`;
