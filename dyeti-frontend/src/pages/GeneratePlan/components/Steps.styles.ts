import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: 1.5rem;
  font-weight: 600;
`;

export const Subtitle = styled.h3`
  margin: 0;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: 1.125rem;
  font-weight: 600;
`;

export const SectionDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const Text = styled.p`
  margin: 0;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary[600]};
  text-decoration: underline;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[700]};
  }
`;

export const WarningBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.warning[100]};
  border: 1px solid ${({ theme }) => theme.colors.warning[300]};
  border-radius: 8px;
`;

export const WarningText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.warning[900] ?? theme.colors.warning[700]};
  font-weight: 500;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
