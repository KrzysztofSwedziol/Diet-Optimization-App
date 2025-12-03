import { styled } from 'styled-components';

export const InputWrapper = styled.div<{ $haserror?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const InputLabel = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  margin: 2px;
  color: ${({ theme }) => theme.colors.neutrals[900]};
`;

export const InputField = styled.input<{
  $haserror?: boolean;
  paddingy?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}>`
  padding-inline: 8px;
  width: 100%;
  text-align: ${({ textAlign }) => textAlign ?? 'left'};
  padding-block: ${({ paddingy }) => (paddingy ? `${paddingy}px` : '8px')};
  color: ${({ theme }) => theme.colors.neutrals[900]};
  background: ${({ theme }) => theme.colors.background};
  border: ${({ theme }) => theme.borderWidth.normal} solid
    ${({ $haserror, theme }) => ($haserror ? theme.colors.danger[500] : theme.colors.neutrals[600])};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  caret-color: ${({ theme }) => theme.colors.neutrals[700]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutrals[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[700]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutrals[100]};
    border-color: ${({ theme }) => theme.colors.neutrals[300]};
    color: ${({ theme }) => theme.colors.neutrals[500]};
    cursor: not-allowed;
  }
`;

export const InputError = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.danger[500]};
  margin: 2px;
  font-style: italic;
`;
