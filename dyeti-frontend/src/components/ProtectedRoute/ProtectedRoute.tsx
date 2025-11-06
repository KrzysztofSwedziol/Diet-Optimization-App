import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context';
import * as Ui from './ProtectedRoute.styles';
import Spinner from '../Spinner/Spinner';

export default function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Ui.LoadingContainer>
        <Spinner />
      </Ui.LoadingContainer>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
