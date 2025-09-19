import { styled } from 'styled-components';

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
export const Footer = styled.div`
  text-align: center;
  margin-top: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[600]};

  a {
    color: ${({ theme }) => theme.colors.primary[700]};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
