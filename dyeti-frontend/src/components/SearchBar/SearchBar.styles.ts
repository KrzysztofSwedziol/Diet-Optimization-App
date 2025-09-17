import { MdClear, MdSearch } from 'react-icons/md';
import { styled } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 8px 32px 8px 48px;
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 2;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
`;

export const SearchIcon = styled(MdSearch).attrs(({ theme }) => ({
  size: 32,
  fill: theme.colors.primary[900],
}))`
  position: absolute;
  left: 8px;
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 8px;
`;

export const ClearIcon = styled(MdClear).attrs(({ theme }) => ({
  size: 16,
  fill: theme.colors.primary[900],
}))`
  flex-shrink: 0;
`;
