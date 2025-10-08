import * as Ui from './Account.styles.ts';
import { StatRow } from '@/pages/Account/StatRow.tsx';

const SidebarStats = () => {
  return (
    <Ui.StatsContainer>
      <StatRow label={'My Products'} value={10} />
      <StatRow label={'My Plans '} value={10} />
      <StatRow label={'Added Products'} value={10} />
      <StatRow label={'Added Meals'} value={10} />
    </Ui.StatsContainer>
  );
};
export default SidebarStats;
