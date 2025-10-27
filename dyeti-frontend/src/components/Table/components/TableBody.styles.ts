import { styled } from 'styled-components';

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ $isEven: boolean }>`
  background-color: ${({ $isEven, theme }) => ($isEven ? theme.colors.neutrals[200] : theme.colors.neutrals[100])};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutrals[300]};
  }
`;

export const TableCell = styled.td`
  text-align: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
`;
