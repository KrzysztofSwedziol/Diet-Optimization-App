import { AppButton } from '@/components';
import * as Ui from './Account.styles';
import { useNavigate } from 'react-router-dom';

const SidebarFooter = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  return (
    <Ui.FooterContainer>
      <AppButton fullWidth size="md" reversed onClick={handleLogout} aria-label="Log out" type="button">
        Log out
      </AppButton>
    </Ui.FooterContainer>
  );
};

export default SidebarFooter;
