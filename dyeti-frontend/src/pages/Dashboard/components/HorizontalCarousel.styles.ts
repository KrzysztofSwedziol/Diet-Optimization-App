import { css, styled } from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
`;

export const Arrow = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 8px 10px;
  font-size: 2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary[900]};
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const Track = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding-top: 8px;
  width: 100%;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 2fr 1fr;
    align-items: stretch;
  }
`;

export const Slide = styled.div<{ $variant: 'active' | 'side' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  ${({ $variant }) =>
    $variant === 'side' &&
    css`
      display: none;
    `}

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ $variant }) =>
      $variant === 'side' &&
      css`
        display: flex;
      `}
  }
`;

export const Box = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  background: red;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  font-weight: 700;
`;
