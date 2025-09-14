import dyeti from '../../../assets/dyeti.svg';
import LoginForm from './LoginForm.tsx';
import AuthPageWrapper from '../AuthPageWrapper.tsx';

const Login = () => {
  return (
    <AuthPageWrapper
      logo={{ src: dyeti, alt: 'DYeti logo' }}
      title="Welcome back!"
      description="Log in to view your diet plans, manage preferences, and more."
      footer={
        <>
          Don’t have an account? <a href="/signup">Sign up</a>
        </>
      }
    >
      <LoginForm />
    </AuthPageWrapper>
  );
};

export default Login;
