import dyeti from '../../../assets/dyeti.svg';
import LoginForm from './LoginForm.tsx';
import FullLayout from '../../../components/Layout/FullLayout.tsx';

const Login = () => {
  return (
    <FullLayout
      logo={{ src: dyeti, alt: 'DYeti logo' }}
      title="Welcome back!"
      description="Log in to view your diet plans, manage preferences, and more."
      footer={
        <>
          Don’t have an account? <a href="/auth/signup">Sign up</a>
        </>
      }
    >
      <LoginForm />
    </FullLayout>
  );
};

export default Login;
