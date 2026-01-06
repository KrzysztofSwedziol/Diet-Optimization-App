import { useNavigate } from 'react-router-dom';
import * as Ui from './CTASection.styles';

const CTASection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth/signup');
  };

  return (
    <Ui.Container>
      <Ui.Content>
        <Ui.Title>Ready to optimize your diet?</Ui.Title>
        <Ui.Text>
          Join Dyeti today and take the first step towards a healthier, more personalized diet plan. Experience the
          power of optimization and enjoy meals tailored to your unique preferences and nutritional needs.
        </Ui.Text>
        <Ui.Button onClick={handleClick}>Get Started</Ui.Button>
      </Ui.Content>
    </Ui.Container>
  );
};

export default CTASection;
