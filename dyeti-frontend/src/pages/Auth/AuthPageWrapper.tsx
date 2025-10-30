import * as Ui from './Auth.styles.ts';
import Layout from '../../components/Layout/Layout.tsx';
import { PageTitle } from '../../components/Typography/PageTitle.tsx';
import { PageDescription } from '../../components/Typography/PageDescription.tsx';

type Props = {
  logo: { src: string; alt: string };
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

const AuthPageWrapper = ({ logo, title, description, children, footer }: Props) => {
  return (
    <Layout>
      <Ui.LogoContainer>
        <Ui.Logo src={logo.src} alt={logo.alt} />
      </Ui.LogoContainer>
      <PageTitle>{title}</PageTitle>
      <PageDescription>{description}</PageDescription>

      {children}

      <Ui.Footer>{footer}</Ui.Footer>
    </Layout>
  );
};

export default AuthPageWrapper;
