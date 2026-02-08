import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import * as Ui from './AppLayout.styles';
import { TutorialSidebar } from '@/components';

const AppLayout = () => {
  return (
    <Ui.Container>
      <Navbar />
      <Ui.Content>
        <TutorialSidebar />
        <Outlet />
      </Ui.Content>
    </Ui.Container>
  );
};

export default AppLayout;
