import { styled } from 'styled-components';
import { MdExpandMore } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-top: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[800]};
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

export const DoneIcon = styled(FiCheckCircle).attrs({
  size: 24,
})<{ $isDone: boolean }>`
    color: ${({ $isDone, theme }) => ($isDone ? theme.colors.success[600] : theme.colors.neutrals[300])}};
`;

export const Body = styled.div<{ $isOpen: boolean }>`
  display: grid;
  gap: 4px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: ${({ $isOpen }) => ($isOpen ? '8px' : '0px')};
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.35s ease-in-out;
`;

export const Header = styled.div<{ $isOpen: boolean }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${({ $isOpen, theme }) => ($isOpen ? theme.colors.neutrals[300] : 'transparent')};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.neutrals[100]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutrals[200]};
  }
`;
export const Content = styled.div`
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: clamp(140px, 22vh, 240px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.neutrals[200]};
  overflow: hidden;
  padding: 8px;
  box-sizing: border-box;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* kluczowe: cały obraz w obszarze */
  display: block;
`;

export const ButtonBox = styled.div`
  margin-top: 8px;
  margin-bottom: 4px;
`;
