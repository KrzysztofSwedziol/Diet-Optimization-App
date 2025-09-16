import { styled } from 'styled-components';

export const Picker = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary[600]};
  border-radius: 9999px;
  padding: 4px;
  height: 40px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin: 10px 0 14px 0;
`;

export const Pill = styled.button<{ $active?: boolean }>`
  position: relative;
  z-index: 1;
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 8px 18px;
  border-radius: 9999px;

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
