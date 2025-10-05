import * as Ui from './Account.styles';
import dyeti from '@/assets/dyeti.svg';
import { useAuth } from '@/components/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Account = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user === null) {
      navigate('/auth/login', { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading || !user) return null; // avoid rendering while redirecting
  console.log(user.age);
  return (
    <Ui.Container>
      <Ui.GridContainer>
        <Ui.AccountSidebar>
          <Ui.LogoContainer>
            <Ui.Logo src={dyeti} alt="DYeti logo" />
          </Ui.LogoContainer>
        </Ui.AccountSidebar>
        <Ui.Container>…</Ui.Container>
      </Ui.GridContainer>
    </Ui.Container>
  );
};

export default Account;
