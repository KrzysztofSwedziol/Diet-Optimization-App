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
        $active={section == 'details'}
        onClick={() => {
          handleClick('details');
        }}
      >
        Account Details
      </Ui.Tab>
      <Ui.Tab
        $active={section == 'space'}
        onClick={() => {
          handleClick('space');
        }}
      >
        My Space
      </Ui.Tab>
      <Ui.Tab
        $active={section == 'manage'}
        onClick={() => {
          handleClick('manage');
        }}
      >
        Manage account
      </Ui.Tab>
    </Ui.TabsBar>
  );
};

export default TabsBar;
