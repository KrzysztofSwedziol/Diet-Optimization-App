import { ReactNode } from 'react';
import Layout from '../../components/Layout/Layout.tsx';
import { PageTitle } from '../../components/Typography/PageTitle';
import { PageDescription } from '../../components/Typography/PageDescription';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

const GeneratePlanLayout = ({ title, description, children }: Props) => {
  return (
    <Layout>
      <PageTitle>{title}</PageTitle>
      <PageDescription>{description}</PageDescription>
      {children}
    </Layout>
  );
};

export default GeneratePlanLayout;
