import * as Ui from './AuthSection.styles';
import { useAuth } from '@/context';
import { useNavigate } from 'react-router-dom';

const AuthSection = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <Ui.Auth>
      {isLoggedIn ? (
        <Ui.SignOutButton onClick={handleLogout}>Log out</Ui.SignOutButton>
      ) : (
        <>
          <Ui.SignInButton to="/auth/login">Log in</Ui.SignInButton>
          <Ui.SignUpButton to="/auth/signup">Sign up</Ui.SignUpButton>
        </>
      )}
    </Ui.Auth>
  );
};

export default AuthSection;
