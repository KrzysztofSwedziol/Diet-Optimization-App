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
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: revert;
  }
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
export const MySpaceGrid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: 1fr;
  padding: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    column-gap: 24px;
  }
`;

export const TileLink = styled('a')`
  display: grid;
  grid-template-rows: auto auto;
  gap: 12px;

  padding: 16px 18px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.neutrals[100]};
  border: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  text-decoration: none;
  color: inherit;

  transition:
    transform 120ms ease,
    box-shadow 120ms ease,
    border-color 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    border-color: ${({ theme }) => theme.colors.neutrals[300]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 3px;
  }
`;

export const IconArea = styled.div`
  width: 100%; /* możesz dopasować 96–128px wg potrzeb */
  border-radius: 12px; /* zaokrąglenie jak na szkicu */
  display: grid;
  padding: 24px;
  place-items: center;
  background: ${({ theme }) => theme.colors.primary[400]}; /* zachowane kolory */
  color: ${({ theme }) => theme.colors.primary[900]};

  & > svg {
    width: 20%;
    height: auto;
    display: block;
  }
`;

/* Dół: tekst po lewej, strzałka po prawej */
export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
`;

export const Content = styled.div`
  display: grid;
  gap: 4px;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.2;
`;

export const Desc = styled.div`
  font-size: ${({ theme }) => theme?.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const RightChevron = styled.div`
  font-size: 24px;
  line-height: 1;
  color: ${({ theme }) => theme?.colors.neutrals[400]};
`;
