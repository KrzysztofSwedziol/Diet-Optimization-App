import { styled } from 'styled-components';
import { MdFavoriteBorder } from 'react-icons/md';

export const Container = styled.div`
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutrals[100]};
  }

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const Name = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[900]};
`;

export const Preference = styled.div`
  align-self: flex-start;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutrals[600]};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FavoriteIcon = styled(MdFavoriteBorder).attrs({ size: 16 })`
  color: ${({ theme }) => theme.colors.primary};
`;

export const NutritionRow = styled.div`
  display: flex;
  gap: 16px;
`;

export const NutritionBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NutritionLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.neutrals[500]};
  text-transform: uppercase;
  white-space: nowrap;
`;

export const NutritionValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;
