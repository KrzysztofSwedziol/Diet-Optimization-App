import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const Container = styled.div`
  text-align: left;
`;

export const ProductNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.primary[700]};
  text-align: left;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[900]};
  }
`;
