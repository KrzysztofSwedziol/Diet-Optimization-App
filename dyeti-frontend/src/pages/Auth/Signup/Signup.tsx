import dyeti from '../../../assets/dyeti-happy.svg';
import SignupForm from './SignupForm.tsx';
import AuthPageWrapper from '../AuthPageWrapper.tsx';

const Signup = () => {
  return (
    <AuthPageWrapper
      logo={{ src: dyeti, alt: 'DYeti logo' }}
      title="Let’s get started!"
      description="Create an account to unlock your personalized diet plans."
      footer={
        <>
          Already have an account? <a href="/login">Login</a>
        </>
      }
    >
      <SignupForm />
    </AuthPageWrapper>
  );
};

export default Signup;
