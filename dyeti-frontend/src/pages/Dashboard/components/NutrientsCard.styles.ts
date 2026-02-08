import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutrals[600]};
`;

export const Value = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.neutrals[200]};
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  border-radius: inherit;
  transition:
    width 0.3s ease,
    background-color 0.3s ease;

  background-color: ${({ $progress, theme }) => {
    if ($progress < 25) return theme.colors.progress[100];
    if ($progress < 50) return theme.colors.progress[200];
    if ($progress < 75) return theme.colors.progress[300];
    if ($progress < 90) return theme.colors.progress[400];
    return theme.colors.progress[500];
  }};
`;
