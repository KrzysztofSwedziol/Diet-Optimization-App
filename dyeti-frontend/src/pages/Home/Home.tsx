import * as Ui from './Home.styles';
import { PageTitle } from '@/components/Typography/PageTitle.tsx';
import { PageDescription } from '@/components/Typography/PageDescription.tsx';
import { AppButton } from '@/components';
import { PageContainer } from '@/components/Layout/PageContainer.tsx';

const Home = () => {
  return (
    <PageContainer>
      <Ui.IntroContainer>
        <Ui.Container>
          <PageTitle>DYeti - Your diet plan companion</PageTitle>
          <PageDescription>Generate personalized diet plans based on your preferences and goals.</PageDescription>
        </Ui.Container>
        <AppButton fullWidth={true}>Get Started</AppButton>

        <AppButton reversed={true} fullWidth={true}>
          Already have account ?
        </AppButton>
      </Ui.IntroContainer>
    </PageContainer>
  );
};

export default Home;
