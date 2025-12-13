import { styled } from 'styled-components';
import { Modal } from '@/components';
import { FaMinus, FaPlus } from 'react-icons/fa';

export const StyledModal = styled(Modal)`
  width: min(90%, 400px);
`;

export const Header = styled.div`
  padding: 4px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutrals[500]};
  border-radius: 6px;

  &:hover {
    color: ${({ theme }) => theme.colors.neutrals[700]};
  }
`;

export const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductName = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary[900]};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutrals[700]};
`;

export const SectionDescription = styled.p`
  margin: 0;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.neutrals[500]};
`;

export const PreferenceControl = styled.div`
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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  padding: 8px;
`;
