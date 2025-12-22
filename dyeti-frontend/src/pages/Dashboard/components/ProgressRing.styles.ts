import { styled } from 'styled-components';

export const Ring = styled.div<{ $value: number; $size?: number; $thickness?: number }>`
  @property --p {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
  }

  --p: ${({ $value }) => $value};

  width: ${({ $size = 56 }) => `${$size}px`};
  height: ${({ $size = 56 }) => `${$size}px`};
  border-radius: 50%;

  background: conic-gradient(
    ${({ $value, theme }) => {
        if ($value < 25) return theme.colors.progress[100];
        if ($value < 50) return theme.colors.progress[200];
        if ($value < 75) return theme.colors.progress[300];
        if ($value < 90) return theme.colors.progress[400];
        return theme.colors.progress[500];
      }}
      calc(var(--p) * 1%),
    ${({ theme }) => theme.colors.background} 0
  );

  transition: --p 0.8s ease;

  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - ${({ $thickness = 6 }) => `${$thickness}px`}),
    #000 0
  );
  mask: radial-gradient(farthest-side, transparent calc(100% - ${({ $thickness = 6 }) => `${$thickness}px`}), #000 0);
`;
export const Container = styled.div`
  justify-items: center;
  justify-content: center;
`;

export const Value = styled.h4`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const RingContainer = styled.div`
  position: relative;
  justify-content: center;
`;
export const Logo = styled.img<{ thickness?: number }>`
  width: calc(100% - ${({ thickness = 6 }) => `${thickness * 2}px`});
  height: calc(100% - ${({ thickness = 6 }) => `${thickness * 2}px`});
  aspect-ratio: 1 / 1;
  object-fit: contain;
  transform: translateY(-6%);
`;
export const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
