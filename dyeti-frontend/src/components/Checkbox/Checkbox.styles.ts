import { styled } from 'styled-components';

export const StyledLabel = styled.label<{ $disabled?: boolean }>`
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;

  ${({ $disabled, theme }) =>
    $disabled &&
    `
    color: ${theme.colors.neutrals[300]};
  `}
`;

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  -webkit-appearance: none;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 0;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid ${({ theme }) => theme.colors.neutrals[600]};
  border-radius: 0.3em;
  align-self: center;
  transform: translateY(-0.075em), translateX(-0.075em);

  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em ${({ theme }) => theme.colors.primary[600]};
    background-color: CanvasText;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.neutrals[300]};
  }

  &:disabled::before {
    box-shadow: inset 1em 1em ${({ theme }) => theme.colors.neutrals[300]};
  }
`;
