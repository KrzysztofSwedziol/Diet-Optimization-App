import { styled } from 'styled-components';
import { MdExpandMore } from 'react-icons/md';

export const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  background-color: ${({ theme }) => theme.colors.background};
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

export const Products = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
`;

export const ProductContainer = styled.div`
  padding: 4px 16px 8px;
  background-color: ${({ theme }) => theme.colors.neutrals[100]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutrals[200]};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  }
`;

export const ExpandIcon = styled(MdExpandMore).attrs({
  size: 24,
})<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease-in-out;
`;
