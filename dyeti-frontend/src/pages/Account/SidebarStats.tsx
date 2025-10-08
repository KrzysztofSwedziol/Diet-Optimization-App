import * as Ui from './Account.styles.ts';
import { StatRow } from '@/pages/Account/StatRow.tsx';
import { useUserStats } from '@/api/user/hooks';
import { Spinner } from '@/components';

const SidebarStats = () => {
  const { data, isLoading, isError } = useUserStats();
  if (isLoading) {
    return (
      <Ui.StatsContainer>
        <Spinner size={28} />
      </Ui.StatsContainer>
    );
  }

  if (isError || !data) {
    return (
      <Ui.StatsContainer>
        <Ui.Row>
          <Ui.StatLabel>Couldn’t load stats</Ui.StatLabel>
        </Ui.Row>
      </Ui.StatsContainer>
    );
  }

  return (
    <Ui.StatsContainer>
      <StatRow label="My Products" value={data.createdProductsCount} />
      <StatRow label="My Plans" value={data.plansCount} />
      <StatRow label="Added Products" value={data.productPrefsCount} />
      <StatRow label="Added Recipes" value={data.createdRecipesCount} />
    </Ui.StatsContainer>
  );
};
export default SidebarStats;
