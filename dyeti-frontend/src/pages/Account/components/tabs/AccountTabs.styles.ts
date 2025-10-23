import { styled } from 'styled-components';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export const Section = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const RequirementLabel = styled.p<{ $fulfilled: boolean }>`
  color: ${({ theme, $fulfilled }) => ($fulfilled ? theme.colors.success[700] : theme.colors.danger[500])};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  margin: 0px;
`;

export const TabsBar = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
`;

export const RequirementSuccessIcon = styled(FiCheckCircle)`
  color: ${({ theme }) => theme.colors.success[700]};
`;

export const RequirementIcon = styled(FiAlertCircle)`
  color: ${({ theme }) => theme.colors.danger[500]};
`;

export const RequirementContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const Tab = styled.button<{ $active?: boolean }>`
  position: relative;
  padding: 10px 0;
  background: none;
  border: 0;
  cursor: pointer;

  color: ${({ theme, $active }) => ($active ? theme.colors.primary[900] : theme.colors.neutrals[600])};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.fontWeight.bold : theme.typography.fontWeight.regular};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 3px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.primary[900]};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform 160ms ease;
  }
`;

export const SettingsGrid = styled.div`
  display: grid;
  width: 60%;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    column-gap: 24px;
  }
`;
export const FormGridColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const ProfileActions = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / 3;
  }
  text-align: center;
  padding-top: 8px;
`;
export const PwdActions = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 3 / -1;
  }
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Error = styled.p`
  color: ${({ theme }) => theme.colors.danger[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
`;
export const Success = styled.p`
  color: ${({ theme }) => theme.colors.success[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
`;

export const ProfileForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / 3;
    grid-template-columns: 1fr 1fr;
    grid-row: 1;
    column-gap: 24px;
  }
`;
export const PwdForm = styled.form`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-row: 1;
  }
`;
