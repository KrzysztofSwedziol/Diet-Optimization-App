import { styled } from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 16px;
  margin: 8px 0 12px 0;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  gap: 8px;
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  }
`;

export const Label = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.neutrals[900]};
`;

export const NumberInput = styled.input`
  width: 96px;
  padding: 8px 10px;

  color: ${({ theme }) => theme.colors.neutrals[900]};
  background: ${({ theme }) => theme.colors.primary[100]};
  border: ${({ theme }) => theme.borderWidth.normal} solid ${({ theme }) => theme.colors.neutrals[600]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  text-align: right;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[700]};
    box-shadow: 0 0 0 ${({ theme }) => theme.borderWidth.thin} ${({ theme }) => theme.colors.primary[700]};
  }
`;
