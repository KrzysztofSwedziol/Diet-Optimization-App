import * as Ui from './AccountTabs.styles.ts';
import { TabKey } from '@/pages/Account/types.ts';

type Props = {
  section: TabKey;
  setSection: (k: TabKey) => void;
};
const TabsBar = ({ section, setSection }: Props) => {
  const handleClick = (k: TabKey) => {
    setSection(k);
  };
  return (
    <Ui.TabsBar>
      <Ui.Tab
        $active={section == 'account'}
        onClick={() => {
          handleClick('account');
        }}
      >
        Account Settings
      </Ui.Tab>
      <Ui.Tab
        $active={section == 'documents'}
        onClick={() => {
          handleClick('documents');
        }}
      >
        Documents
      </Ui.Tab>
      <Ui.Tab
        $active={section == 'notifications'}
        onClick={() => {
          handleClick('notifications');
        }}
      >
        Notifications
      </Ui.Tab>
    </Ui.TabsBar>
  );
};

export default TabsBar;
