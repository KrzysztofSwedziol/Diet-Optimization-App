import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  gap: 16px;
`;

export const Card = styled.div<{ $error?: boolean }>`
  background: ${({ theme, $error }) => ($error ? `${theme.colors.danger[100]}33` : theme.colors.neutrals[100])};
  color: ${({ theme }) => theme.colors.neutrals[900]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 16px 18px;
  border: ${({ theme, $error }) =>
    $error
      ? `${theme.borderWidth.normal} solid ${theme.colors.danger[500]}`
      : `${theme.borderWidth.thin} solid ${theme.colors.neutrals[200]}`};
`;

export const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutrals[900]};
`;

export const CardText = styled.p`
  margin: 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const Warning = styled.p`
  margin: 10px 0 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.danger[500]};
  font-style: italic;
`;

export const ButtonsGrid = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 20px;
`;
//copied from login
export const Error = styled.p`
  color: ${({ theme }) => theme.colors.danger[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
