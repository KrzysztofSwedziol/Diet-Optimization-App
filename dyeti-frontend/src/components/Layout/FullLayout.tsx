import * as Ui from './Layout.styles.ts';
import Layout from '../../components/Layout/Layout.tsx';
import { PageTitle } from '../Typography/PageTitle.tsx';
import { PageDescription } from '../Typography/PageDescription.tsx';

type Props = {
  logo?: { src: string; alt: string };
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const AuthPageWrapper = ({ logo, title, description, children, footer }: Props) => {
  return (
    <Layout>
      {logo && (
        <Ui.LogoContainer>
          <Ui.Logo src={logo.src} alt={logo.alt} />
        </Ui.LogoContainer>
      )}
      {title && <PageTitle>{title}</PageTitle>}
      {description && <PageDescription>{description}</PageDescription>}

      {children}

      {footer && <Ui.Footer>{footer}</Ui.Footer>}
    </Layout>
  );
};

export default AuthPageWrapper;
