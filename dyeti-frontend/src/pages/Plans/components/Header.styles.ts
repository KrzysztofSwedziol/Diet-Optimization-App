import { AppButton, PageDescription } from '@/components';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  padding-bottom: 16px;
  margin-bottom: 32px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 32px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
`;

export const Description = styled(PageDescription)`
  margin: 0;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const Button = styled(AppButton)`
  margin: 0;
  padding: 0.5rem 1rem;
  white-space: nowrap;
`;
