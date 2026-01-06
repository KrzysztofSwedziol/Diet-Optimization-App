import { AppButton } from '@/components';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  padding: 32px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  min-height: 500px;
  gap: 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row-reverse;
  }
`;

export const Image = styled.img`
  flex: 3;
  height: auto;
  align-self: center;
`;

export const Description = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

export const TitleContainer = styled.div``;

export const Eyebrow = styled.p`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary[700]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.neutrals[600]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 1.2;
  margin: 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    gap: 16px;
  }
`;

export const Button = styled(AppButton)`
  margin: 0;
`;
