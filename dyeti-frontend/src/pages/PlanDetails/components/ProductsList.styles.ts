import { styled } from 'styled-components';

export const Container = styled.div``;

export const ProductsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ProductsListItem = styled.li`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;
