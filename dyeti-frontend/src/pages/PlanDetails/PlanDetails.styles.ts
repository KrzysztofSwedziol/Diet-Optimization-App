import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 64px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
`;

export const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  margin-bottom: 32px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-areas:
    'products'
    'nutrients'
    'meals ';
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-areas:
      'products nutrients'
      'meals meals';
    grid-template-columns: 3fr 2fr;
    gap: 32px;
  }
`;

export const ProductsSection = styled.div`
  grid-area: products;
`;

export const NutrientsSection = styled.div`
  grid-area: nutrients;
`;

export const MealsSection = styled.div`
  grid-area: meals;
`;

export const SectionTitle = styled.h2`
  padding: 8px;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: bold;
  /* text-transform: uppercase; */
`;

export const StatusContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  min-height: 200px;
  text-align: center;
`;

export const StatusText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.neutrals[700]};
`;
