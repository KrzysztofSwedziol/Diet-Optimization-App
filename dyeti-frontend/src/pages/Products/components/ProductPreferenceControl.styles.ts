import { FaMinus, FaPlus } from 'react-icons/fa';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Value = styled.div`
  min-width: 32px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  border: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 4px;
  line-height: 0;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary[700]};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary[800]};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: revert;
  }
`;

export const Input = styled.input`
  width: 50px;
  text-align: center;
  font-size: 14px;
  padding: 2px;
  border: 1px solid ${({ theme }) => theme.colors.primary[300]};
  border-radius: 4px;
`;

export const MinusIcon = styled(FaMinus).attrs({ size: 16 })`
  color: ${({ theme }) => theme.colors.neutrals[100]};
  margin: 0;
`;

export const PlusIcon = styled(FaPlus).attrs({ size: 16 })`
  color: ${({ theme }) => theme.colors.neutrals[100]};
  margin: 0;
`;
