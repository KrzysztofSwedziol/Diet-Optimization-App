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
  background-color: ${({ theme }) => theme.colors.primary[500]};
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

export const Username = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
export const Email = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutrals[700]};
  margin: 0;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  background: transparent;
  border: 0;
  text-align: left;
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: 16px;
  line-height: 1.2;
`;

export const Pill = styled.div`
  display: flex;
  align-items: center;
  min-width: 38px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.neutrals[100]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;
