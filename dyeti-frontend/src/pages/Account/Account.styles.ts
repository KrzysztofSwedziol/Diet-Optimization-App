import { styled } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const GridContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 3fr;
  }
`;
export const AccountSidebar = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[700]};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;
export const Logo = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  transform: translateY(-6%);
`;
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  aspect-ratio: 1 / 1;
  width: 80%;
  box-sizing: border-box;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary[800]};
  border: 5px solid ${({ theme }) => theme.colors.neutrals[900]};
  color: inherit;
  margin: 16px;
`;
