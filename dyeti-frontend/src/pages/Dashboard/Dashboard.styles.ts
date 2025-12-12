import { styled } from 'styled-components';

export const DashboardGrid = styled.div`
  display: grid;
  column-gap: 32px;
  row-gap: 24px;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }
`;
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 64px);
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  padding: 16px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;
export const TitleWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  border-bottom: solid 2px ${({ theme }) => theme.colors.neutrals[700]};
`;
