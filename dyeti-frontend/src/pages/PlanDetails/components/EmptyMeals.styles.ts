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
  justify-content: center;
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
