import { styled } from 'styled-components';

export const StatusContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  min-height: 200px;
  text-align: center;
`;

export const StatusText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.neutrals[700]};
`;
