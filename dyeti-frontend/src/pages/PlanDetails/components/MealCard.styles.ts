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
  color: ${({ theme }) => theme.colors.neutrals[900]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const Body = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.35s ease-in-out;
`;

export const Content = styled.div`
  overflow: hidden;
`;

export const RecipeGrid = styled.div`
  padding: 16px 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Products = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
`;

export const ExpandIcon = styled(MdExpandMore).attrs({
  size: 24,
})<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease-in-out;
`;

export const Description = styled.p`
  grid-area: description;
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[700]};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.4;
`;

export const Ingredients = styled.div`
  grid-area: ingredients;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  padding: 16px;
  border-radius: 8px;
`;

export const Steps = styled.div`
  grid-area: steps;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.neutrals[700]};
`;

export const StepsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StepItem = styled.li`
  line-height: 1.4;
`;

export const StepNumber = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutrals[800]};
`;

export const StepText = styled.span`
  color: ${({ theme }) => theme.colors.neutrals[700]};
`;
