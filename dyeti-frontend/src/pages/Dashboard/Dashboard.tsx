import { PageTitle } from '@/components';
import * as Ui from './Dashboard.styles.ts';
import { CardCfg } from '@/pages/Account/types.ts';
import { FaFileSignature, FaArrowRight } from 'react-icons/fa';
import { FiPackage, FiSliders } from 'react-icons/fi';
import DashboardCard from '@/pages/Dashboard/components/DashboardCard.tsx';
import { useNavigate } from 'react-router-dom';
import HorizontalCarousel from '@/pages/Dashboard/components/HorizontalCarousel.tsx';
import { useGetTopPlans } from '@/api/plan/hooks';
import PlanCard from '@/pages/Dashboard/components/PlanCard.tsx';

const CARDS: CardCfg[] = [
  {
    key: 'generatePlan',
    to: '/plans/generate',
    icon: FaFileSignature,
    title: 'Generate Plan',
    description: 'Generate new Plan Based on your food preferences.',
  },
  {
    key: 'products',
    to: '/products',
    icon: FiPackage,
    title: 'Products',
    description: 'Browse all products (including your custom ones) - star or unstar them.',
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
  const navigate = useNavigate();
  const { data: plans = [], isLoading, isError } = useGetTopPlans(5);
  console.log(isError, isLoading); //placeholder for eslint
  return (
    <Ui.PageContainer>
      <Ui.DashboardGrid>
        <Ui.TitleWrapper>
          <PageTitle>Dashboard User</PageTitle>
        </Ui.TitleWrapper>
        {CARDS.map(({ key, to, icon, title, description }) => (
          <DashboardCard key={key} to={to} icon={icon} title={title} description={description} />
        ))}
        <Ui.TitleWrapperLink onClick={() => navigate('/plans')}>
          <PageTitle>Recent Plans</PageTitle>
          <Ui.IconArea>
            <FaArrowRight />
          </Ui.IconArea>
        </Ui.TitleWrapperLink>
        <HorizontalCarousel
          items={plans}
          getKey={plan => plan.id}
          renderItem={(plan, isActive) => <PlanCard plan={plan} isActive={isActive} />}
        />
      </Ui.DashboardGrid>

      <Ui.TitleWrapper>
        <PageTitle>Dashboard User</PageTitle>
      </Ui.TitleWrapper>
    </Ui.PageContainer>
  );
};
export default Dashboard;
