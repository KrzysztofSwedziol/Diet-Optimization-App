import { styled, css, keyframes } from 'styled-components';

const fillAnimation = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

export const StepperContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

interface StepSegmentProps {
  filled?: boolean;
}

export const StepSegment = styled.div<StepSegmentProps>`
  flex: 1;
  height: 16px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.neutrals[300]};
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ filled }) => (filled ? '100%' : '0%')};
    background-color: ${({ theme }) => theme.colors.primary[500]};
    border-radius: 50px;
    transform-origin: left;
    ${({ filled }) =>
      filled &&
      css`
        animation: ${fillAnimation} 0.3s ease forwards;
      `}
  }
`;
