import { PageTitle } from '@/components';
import * as Ui from './Dashboard.styles.ts';
import { CardCfg } from '@/pages/Account/types.ts';
import { FaFileSignature } from 'react-icons/fa';
import { FiPackage, FiSliders } from 'react-icons/fi';
import DashboardCard from '@/pages/Dashboard/components/DashboardCard.tsx';
const CARDS: readonly CardCfg[] = [
  {
    key: 'generatePlan',
    to: '/plans/generate',
    icon: FaFileSignature,
    title: 'Generate Plan',
    description: 'Generate new Plan Based on your food preferences.',
  },
  {
    key: 'myProducts',
    to: '/products',
    icon: FiPackage,
    title: 'My Products',
    description: 'Manage all products — add new ones or remove old ones.',
  },
  {
    key: 'myPreferences',
    to: '/preferences',
    icon: FiSliders,
    title: 'My Preferences',
    description: 'Manage preferences applied to products.',
  },
] as const;
const Dashboard = () => {
  return (
    <Ui.PageContainer>
      <Ui.DashboardGrid>
        <Ui.TitleWrapper>
          <PageTitle>Dashboard User</PageTitle>
        </Ui.TitleWrapper>
        {CARDS.map(({ key, to, icon, title, description }) => (
          <DashboardCard key={key} to={to} icon={icon} title={title} description={description} />
        ))}
      </Ui.DashboardGrid>
    </Ui.PageContainer>
  );
};
export default Dashboard;
