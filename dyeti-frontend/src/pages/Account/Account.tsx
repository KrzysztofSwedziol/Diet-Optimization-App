import * as Ui from './Account.styles';
import { useAuth } from '@/components/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccountSidebar from '@/pages/Account/AccountSidebar.tsx';

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
    <Ui.Container>
      <Ui.GridContainer>
        <AccountSidebar user={user} />
        <Ui.Container>…</Ui.Container>
      </Ui.GridContainer>
    </Ui.Container>
  );
};

export default Account;
