import { styled } from 'styled-components';

export const Container = styled.div``;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 4px;
  padding: 0;
  list-style: none;
`;

export const DropdownItem = styled.li``;

export const NoResults = styled.div`
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.neutrals[500]};
`;
