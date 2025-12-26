import { styled } from 'styled-components';
import { FaGraduationCap } from 'react-icons/fa6';

export const Container = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;

  background: ${({ theme }) => theme.colors.primary[600]};
  overflow: visible;

  display: flex;
  flex-direction: column;

  width: ${({ $isOpen }) => ($isOpen ? '20%' : '3px')};
  min-width: ${({ $isOpen }) => ($isOpen ? '350px' : '3px')};
  padding: ${({ $isOpen }) => ($isOpen ? '8px' : '0px')};
  gap: ${({ $isOpen }) => ($isOpen ? '8px' : '0px')};
  z-index: 10;
  transition:
    width 300ms ease,
    min-width 300ms ease,
    padding 300ms ease,
    gap 300ms ease;
`;
export const Blob = styled.div`
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 40px;
  position: absolute;
  background: ${({ theme }) => theme.colors.primary[600]};
  top: 100px;
  right: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
  border-radius: 50% 0 0 50%;
  color: ${({ theme }) => theme.colors.primary[900]};
  cursor: pointer;
  z-index: 10;
`;
export const Content = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
`;

export const TutorialList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  gap: 8px;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
export const TitleContainer = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  display: inline-flex;
  width: 100%;
  gap: 8px;
  padding-left: 8px;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals[100]};
  align-items: center;
  color: ${({ theme }) => theme.colors.neutrals[100]};
`;

export const Icon = styled(FaGraduationCap).attrs({ size: 32 })``;
