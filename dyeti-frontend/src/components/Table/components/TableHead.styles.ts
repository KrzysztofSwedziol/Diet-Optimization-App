import { styled } from 'styled-components';

export const TableHead = styled.thead``;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  text-align: center;
  padding: 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals[300]};
  color: ${({ theme }) => theme.colors.neutrals[900]};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const HeaderContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
