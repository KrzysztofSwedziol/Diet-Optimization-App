import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px); // odejmuje navbar
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 32px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.neutrals[900]};
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin-bottom: 24px;
`;

export const InputWrapper = styled.div<{ hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  input {
    padding: 12px;
    border: 1px solid ${({ hasError, theme }) => (hasError ? theme.colors.danger[500] : theme.colors.neutrals[300])};
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary[700]};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary[700]};
    }
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.danger[500]};
    margin-top: 4px;
  }
`;

export const ForgotPassword = styled.a`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primary[700]};
  text-decoration: none;
  margin-left: auto;
  display: inline-block;
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

export const RememberMe = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin-bottom: 16px;

  input {
    margin-right: 8px;
  }
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
