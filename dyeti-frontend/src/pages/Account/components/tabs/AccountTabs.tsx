import * as Ui from './AccountTabs.styles.ts';
import TabsBar from '@/pages/Account/components/tabs/TabsBar.tsx';
import DetailsTab from '@/pages/Account/components/tabs/details/DetailsTab.tsx';
import { JSX, useMemo, useState } from 'react';
import { TabKey } from '@/pages/Account/types.ts';
import { User } from '@/api/types.ts';
import MySpaceTab from '@/pages/Account/components/tabs/myspace/MySpaceTab.tsx';

type Props = {
  user: User;
};

const AccountTabs = ({ user }: Props) => {
  const [section, setSection] = useState<TabKey>('details');
  const view = useMemo(() => {
    const byKey: Record<TabKey, JSX.Element> = {
      details: <DetailsTab user={user} />,
      space: <MySpaceTab />,
      manage: <>Manage Subscription XDDDD</>,
    };
    return byKey[section];
  }, [section, user]);
  return (
    <Ui.Section>
      <TabsBar section={section} setSection={setSection} />
      {view}
    </Ui.Section>
  );
};

export default AccountTabs;
