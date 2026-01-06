import { AppButton } from '@/components';
import { styled } from 'styled-components';

export const Container = styled.section`
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 32px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin: 0;
`;

export const Text = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.5;
  margin: 0;
`;

export const Button = styled(AppButton)``;
