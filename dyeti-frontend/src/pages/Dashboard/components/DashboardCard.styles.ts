import { styled } from 'styled-components';

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
