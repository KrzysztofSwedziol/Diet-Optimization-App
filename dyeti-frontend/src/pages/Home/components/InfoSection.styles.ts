import { styled } from 'styled-components';

export const Container = styled.section`
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.neutrals[100]};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin: 0;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: 32px;
  }
`;

export const Card = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  padding: 32px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-4px);
  }
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 1.2;
  margin: 0;
`;

export const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.neutrals[600]};
  font-size: 1rem;
  margin: 0;
`;
