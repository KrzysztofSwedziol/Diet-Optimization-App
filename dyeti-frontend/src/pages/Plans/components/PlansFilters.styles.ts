import { SearchBar } from '@/components';
import { styled } from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledSearchBar = styled(SearchBar)`
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 450px;
  }
`;
