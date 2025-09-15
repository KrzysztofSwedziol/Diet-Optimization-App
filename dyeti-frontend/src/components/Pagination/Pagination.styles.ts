import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 1rem;
`;

export const PageLink = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 0.25rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary[700]};
  ${({ $active }) =>
    $active &&
    css`
      font-weight: bold;
      text-decoration: underline;
    `}

  &:disabled {
    color: ${({ theme }) => theme.colors.neutrals[400]};
    cursor: default;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: revert;
  }
`;

export const Ellipsis = styled.span`
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.colors.neutrals[400]};
`;
