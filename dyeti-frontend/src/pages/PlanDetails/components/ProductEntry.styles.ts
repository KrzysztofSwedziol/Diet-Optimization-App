import { styled } from 'styled-components';

export const Row = styled.div`
  padding: 4px 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutrals[100]};
  }
`;

export const Name = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutrals[800]};
  line-height: 1.2;
`;

export const Details = styled.div`
  margin-top: 2px;
  display: flex;
  gap: 8px;
`;

export const Quantity = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  white-space: nowrap;
`;

export const Calories = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.thin};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  white-space: nowrap;
`;
