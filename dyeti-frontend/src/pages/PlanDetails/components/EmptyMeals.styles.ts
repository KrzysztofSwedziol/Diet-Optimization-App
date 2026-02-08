import { FaMinus, FaPlus } from 'react-icons/fa6';
import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  border: 1px dashed ${({ theme }) => theme.colors.neutrals[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 480px;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const Description = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const LoadingText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const NumericInput = styled.div`
  display: flex;
  align-items: stretch;
  gap: 4px;
  width: fit-content;
  margin: 0 auto 8px;
`;

export const Input = styled.input`
  width: 64px;
  height: 44px;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: 8px 0;
  border: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[600]};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StepButton = styled.button`
  height: 44px;
  width: 44px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary[600]};
  cursor: pointer;
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[700]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const MinusIcon = styled(FaMinus).attrs({ size: 18 })``;
export const PlusIcon = styled(FaPlus).attrs({ size: 18 })``;
