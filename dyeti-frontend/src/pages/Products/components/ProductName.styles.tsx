import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { FaRegStar, FaStar } from 'react-icons/fa';

export const Container = styled.div`
  text-align: left;
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const ProductNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.primary[700]};
  text-align: left;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[900]};
  }
`;
export const StarButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

export const StarIcon = styled(FaRegStar)`
  flex: 0 0 auto;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary[600]};
`;
export const StarIconFill = styled(FaStar)`
  flex: 0 0 auto;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary[600]};
`;
