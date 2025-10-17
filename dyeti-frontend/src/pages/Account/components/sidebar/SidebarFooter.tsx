import { AppButton } from '@/components';
import * as Ui from './AccountSidebar.styles.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/providers/AuthProvider.tsx';

const SidebarFooter = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout()
      .then(() => {
        console.log('Logged out');
      })
      .catch(err => {
        console.error('Logout error:', err);
      });
    navigate('/');
  };
  return (
    <Ui.FooterContainer>
      <AppButton fullWidth size="md" reversed onClick={handleLogout} type="button">
        Log out
      </AppButton>
    </Ui.FooterContainer>
  );
};

export default SidebarFooter;
