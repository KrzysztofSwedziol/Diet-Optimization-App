import { styled } from 'styled-components';
import { MdExpandMore } from 'react-icons/md';

export const Container = styled.div<{ isOpen: boolean; index: number }>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  background-color: ${({ theme }) => theme.colors.background};

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-6px)')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};

  transition:
    opacity 300ms ease,
    transform 300ms ease,
    visibility 0ms linear ${({ isOpen }) => (isOpen ? '0ms' : '160ms')};

  transition-delay: ${({ isOpen, index }) => (isOpen ? `${300 * (index + 1)}ms` : '0ms')};
`;

export const Header = styled.div<{ $isOpen: boolean }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${({ $isOpen, theme }) => ($isOpen ? theme.colors.neutrals[300] : 'transparent')};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutrals[200]};
  }
`;

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[800]};
`;

export const Body = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.35s ease-in-out;
`;

export const Content = styled.div`
  overflow: hidden;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin: 0;
  padding: 8px;

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ExpandIcon = styled(MdExpandMore).attrs({
  size: 24,
})<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease-in-out;
`;
