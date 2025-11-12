import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const Auth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 8px;
`;

export const SignInButton = styled(NavLink)`
  padding: 0.6em 1.2em;

  background: none;
  border: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  border-radius: 8px;
  cursor: pointer;

  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[600]};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    border-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

export const SignUpButton = styled(NavLink)`
  padding: 0.6em 1.2em;

  background-color: ${({ theme }) => theme.colors.primary[600]};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[700]};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const SignOutButton = styled.button`
  padding: 0.6em 1.2em;

  background: none;
  border: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  border-radius: 8px;
  cursor: pointer;

  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[600]};

  &:hover {
    color: ${({ theme }) => theme.colors.danger[400]};
    border-color: ${({ theme }) => theme.colors.danger[400]};
  }
`;
