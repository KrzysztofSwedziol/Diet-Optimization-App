import { Outlet } from 'react-router-dom';
import { PlanGenerationProvider } from '@/context';

const PlanGenerationLayout = () => {
  return (
    <PlanGenerationProvider>
      <Outlet />
    </PlanGenerationProvider>
  );
};

export default PlanGenerationLayout;
