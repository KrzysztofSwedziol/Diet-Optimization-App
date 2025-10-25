import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ProductName = styled(NavLink)`
  color: ${({ theme }) => theme.colors.primary[700]};
  text-align: left;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[900]};
  }
`;

export const Details = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const Quantity = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const Calories = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.thin};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  white-space: nowrap;
`;
