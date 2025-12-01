import { PageDescription } from '@/components';
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
  margin-bottom: 0;
`;

export const Description = styled(PageDescription)`
  margin: 0;
`;

export const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  gap: 24px;
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

export const Grid = styled.div`
  margin-top: 16px;
  display: grid;
  gap: 16px;

  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 20px;
  }
`;

export const EmptyState = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
`;

export const EmptyTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutrals[700]};
`;

export const EmptyDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[500]};
  max-width: 280px;
`;

export const ProductSearchBarContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 600px;
  }
`;
