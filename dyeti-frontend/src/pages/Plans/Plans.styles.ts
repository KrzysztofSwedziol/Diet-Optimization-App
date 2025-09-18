import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 64px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

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
