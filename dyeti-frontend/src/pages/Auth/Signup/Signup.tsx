import * as Ui from '../Auth.styles.ts';
import dyeti from '../../../assets/dyeti-happy.svg';
import { PageTitle } from '../../../components/Typography/PageTitle.tsx';
import { PageDescription } from '../../../components/Typography/PageDescription.tsx';
import SignupForm from './SignupForm.tsx';

const Signup = () => {
  return (
    <Ui.Container>
      <Ui.Card>
        <Ui.LogoContainer>
          <Ui.Logo src={dyeti} alt="DYeti logo" />
        </Ui.LogoContainer>

        <PageTitle>Let’s get started!</PageTitle>
        <PageDescription>Create an account to unlock your personalized diet plans.</PageDescription>

        <SignupForm />

        <Ui.Footer>
          Already have an account? <a href="/login">Login</a>
        </Ui.Footer>
      </Ui.Card>
    </Ui.Container>
  );
};

export default Signup;
