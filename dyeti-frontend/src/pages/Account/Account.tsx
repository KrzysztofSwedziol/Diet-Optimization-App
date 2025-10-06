import * as Ui from './Account.styles';
import dyeti from '@/assets/dyeti.svg';
import { useAuth } from '@/components/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { StatRow } from '@/pages/Account/StatRow.tsx';

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
        <Ui.AccountSidebar>
          <Ui.LogoContainer>
            <Ui.Logo src={dyeti} alt="DYeti logo" />
          </Ui.LogoContainer>
          <Ui.Username>{user.username}</Ui.Username>
          <Ui.Email>{user.email}</Ui.Email>
          <StatRow label={'MyProducts'} value={10} />
          <StatRow label={'MyPlans '} value={10} />
        </Ui.AccountSidebar>
        <Ui.Container>…</Ui.Container>
      </Ui.GridContainer>
    </Ui.Container>
  );
};

export default Account;
