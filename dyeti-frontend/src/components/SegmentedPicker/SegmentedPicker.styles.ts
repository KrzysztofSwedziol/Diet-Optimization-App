import { styled } from 'styled-components';

export const Picker = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr; /* wszystkie kolumny równej szerokości */
  align-items: stretch; /* NIE center – rozciągamy w pionie */
  background: ${({ theme }) => theme.colors.primary[600]};
  border-radius: 9999px;
  padding: 4px;
  height: 40px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Pill = styled.button<{ $active?: boolean }>`
  position: relative;
  z-index: 1;
  appearance: none;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 18px;
  border-radius: 9999px;
  line-height: 1;

  border: 0;
  background: transparent;
  cursor: pointer;

  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary[700] : theme.colors.neutrals[100])};

  transition: opacity 120ms ease;
  &:hover {
    opacity: 0.9;
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: revert;
  }
`;

export const Knob = styled.span<{ $index: number; $count: number }>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 8px) / ${({ $count }) => $count});
  transform: translateX(calc(${({ $index }) => $index} * 100%));

  background: ${({ theme }) => theme.colors.neutrals[100]}; /* „biała” pigułka */
  border-radius: 9999px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 180ms ease;
`;
