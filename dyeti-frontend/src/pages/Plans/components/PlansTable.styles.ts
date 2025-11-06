import { SearchBar } from '@/components';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StyledSearchBar = styled(SearchBar)`
  max-width: 450px;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 0;
`;

export const EmptyMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-align: center;
`;
