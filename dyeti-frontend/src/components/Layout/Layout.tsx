import { PageContainer } from './PageContainer.tsx';
import { Card } from './Card.tsx';

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <PageContainer>
      <Card>{children}</Card>
    </PageContainer>
  );
};

export default Layout;
