import { useNavigate } from 'react-router-dom';
import * as Ui from './HeroSection.styles';
import heroImage from '@/assets/hero.png';
import { useAuth } from '@/context';

const HeroSection = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/auth/signup');
    }
  };

  const handleLearnMore = () => {
    console.log('Learn more clicked');
  };

  return (
    <Ui.Container>
      <Ui.Content>
        <Ui.Image src={heroImage} alt="DYeti Logo" width={300} height={300} />
        <Ui.Description>
          <Ui.TitleContainer>
            <Ui.Eyebrow>Approved By Yetis</Ui.Eyebrow>
            <Ui.Title>DYeti - Your diet plan companion</Ui.Title>
          </Ui.TitleContainer>
          <Ui.Subtitle>Generate personalized diet plans based on your preferences and goals.</Ui.Subtitle>
          <Ui.ButtonsContainer>
            <Ui.Button onClick={handleGetStarted}>Get Started</Ui.Button>
            <Ui.Button reversed onClick={handleLearnMore}>
              Learn More
            </Ui.Button>
          </Ui.ButtonsContainer>
        </Ui.Description>
      </Ui.Content>
    </Ui.Container>
  );
};

export default HeroSection;
