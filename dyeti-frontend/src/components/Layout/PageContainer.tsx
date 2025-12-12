import { styled } from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100dvh - 64px);
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  padding: 16px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;
