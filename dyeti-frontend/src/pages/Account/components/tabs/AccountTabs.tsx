import * as Ui from './AccountTabs.styles.ts';
import TabsBar from '@/pages/Account/components/tabs/TabsBar.tsx';
import SettingsTab from '@/pages/Account/components/tabs/SettingsTab.tsx';
import { useState } from 'react';
import { TabKey } from '@/pages/Account/types.ts';
import { User } from '@/api/types.ts';

type Props = {
  user: User;
};

const AccountTabs = ({ user }: Props) => {
  const [section, setSection] = useState<TabKey>('account');
  return (
    <Ui.Section>
      <TabsBar section={section} setSection={setSection} />
      <SettingsTab user={user} />
    </Ui.Section>
  );
};

export default AccountTabs;
