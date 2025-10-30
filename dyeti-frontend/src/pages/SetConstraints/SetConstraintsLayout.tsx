import { ReactNode } from 'react';
import Layout from '../../components/Layout/Layout.tsx';
import { PageTitle } from '../../components/Typography/PageTitle.tsx';
import { PageDescription } from '../../components/Typography/PageDescription.tsx';
type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

const SetConstraintsLayout = ({ title, description, children }: Props) => {
  return (
    <Layout>
      <PageTitle>{title}</PageTitle>
      <PageDescription>{description}</PageDescription>
      {children}
    </Layout>
  );
};

export default SetConstraintsLayout;
