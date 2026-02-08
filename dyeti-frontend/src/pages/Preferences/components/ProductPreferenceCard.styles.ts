import { MdFavoriteBorder } from 'react-icons/md';
import { styled } from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const Name = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary[900]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

export const PreferenceBadge = styled.div`
  background: ${({ theme }) => theme.colors.primary[700]};
  color: white;
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const NutritionDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutrals[500]};
`;
