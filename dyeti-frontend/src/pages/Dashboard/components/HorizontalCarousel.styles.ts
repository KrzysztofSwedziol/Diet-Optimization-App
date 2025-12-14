import { css, styled } from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-column: 1 / -1;
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
`;

export const Track = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-top: 8px;
  width: 100%;
  height: 100%;
`;

export const Slide = styled.div<{ $variant: 'active' | 'side' }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $variant }) =>
    $variant === 'active'
      ? css`
          width: 100%;
          opacity: 1;
          transform: scale(1);
        `
      : css`
          width: 35%;
          opacity: 0.85;
          transform: scale(0.94);
          display: none;
        `}

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ $variant }) =>
      $variant === 'side' &&
      css`
        display: flex;
      `}

    ${({ $variant }) =>
      $variant === 'active' &&
      css`
        width: 60%;
      `}
  }
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;

  background: red;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  font-weight: 700;
`;
