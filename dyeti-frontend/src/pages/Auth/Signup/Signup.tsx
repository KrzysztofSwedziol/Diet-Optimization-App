import dyeti from '../../../assets/dyeti-happy.svg';
import SignupForm from './SignupForm.tsx';
import FullLayout from '../../../components/Layout/FullLayout.tsx';

const Signup = () => {
  return (
    <FullLayout
      logo={{ src: dyeti, alt: 'DYeti logo' }}
      title="Let’s get started!"
      description="Create an account to unlock your personalized diet plans."
      footer={
        <>
          Already have an account? <a href="/auth/login">Login</a>
        </>
      }
    >
      <SignupForm />
    </FullLayout>
  );
};

export default Signup;
