import * as Ui from './Account.styles';
import { useAuth } from '@/context/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccountSidebar from '@/pages/Account/components/sidebar/AccountSidebar.tsx';
import AccountTabs from '@/pages/Account/components/tabs/AccountTabs.tsx';

const Account = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user === null) {
      navigate('/auth/login', { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading || !user) return null; // avoid rendering while redirecting
  return (
    <Ui.PageContainer>
      <Ui.GridContainer>
        <AccountSidebar user={user} />
        <AccountTabs user={user} />
      </Ui.GridContainer>
    </Ui.PageContainer>
  );
};

export default Account;
