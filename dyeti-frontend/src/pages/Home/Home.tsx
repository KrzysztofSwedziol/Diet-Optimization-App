import * as Ui from './Home.styles';
import CTASection from './components/CTASection';
import ExampleSection from './components/ExampleSection';
import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';

const Home = () => {
  return (
    <Ui.Container>
      <HeroSection />
      <InfoSection />
      <ExampleSection />
      <CTASection />
    </Ui.Container>
  );
};

export default Home;
