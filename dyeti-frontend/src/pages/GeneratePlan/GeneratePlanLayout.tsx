import Layout from '../../components/Layout/Layout.tsx';
import { PageTitle } from '../../components/Typography/PageTitle';
import { PageDescription } from '../../components/Typography/PageDescription';
import * as Ui from './GeneratePlan.styles.tsx';

type Props = {
  logo: { src: string; alt: string };
  title: string;
  description: string;
  children: React.ReactNode;
};
//Almost the same to AuthWrapper
const GeneratePlanLayout = ({ logo, title, description, children }: Props) => {
  return (
    <Layout>
      <Ui.LogoContainer>
        <Ui.Logo src={logo.src} alt={logo.alt} />
      </Ui.LogoContainer>
      <PageTitle>{title}</PageTitle>
      <PageDescription>{description}</PageDescription>
      {children}
    </Layout>
  );
};

export default GeneratePlanLayout;
