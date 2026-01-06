import { styled } from 'styled-components';

export const Container = styled.section`
  min-height: 400px;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

export const Content = styled.div<{ $reversed?: boolean }>`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: ${({ $reversed }) => ($reversed ? 'row-reverse' : 'row')};
  justify-content: center;
  align-items: center;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column-reverse;
    gap: 16px;
  }
`;

export const Image = styled.img`
  min-width: 0;
  max-width: min(400px, 100%);
  flex: 1;
  height: auto;
  align-self: center;
`;

export const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary[900]};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  line-height: 1.2;
  margin: 0;
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.5;
  margin: 0;
`;
