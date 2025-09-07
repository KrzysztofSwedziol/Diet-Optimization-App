import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  padding: 16px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 32px;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.neutrals[900]};
`;
export const Logo = styled.img`
  width: 50%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
`;
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  width: 100%;
`;
export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin-bottom: 24px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const ForgotPassword = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary[700]};
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[900]};
  margin-bottom: 16px;

  input {
    margin-right: 8px;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.primary[600]};
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[700]};
  }
`;

export const Footer = styled.div`
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.neutrals[600]};

  a {
    color: ${({ theme }) => theme.colors.primary[700]};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
