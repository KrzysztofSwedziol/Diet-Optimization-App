import { User } from '@/api/types.ts';
import * as Ui from './AccountSidebar.styles.ts';
import SidebarHeader from '@/pages/Account/components/sidebar/SidebarHeader.tsx';
import SidebarStats from '@/pages/Account/components/sidebar/SidebarStats.tsx';
import SidebarFooter from '@/pages/Account/components/sidebar/SidebarFooter.tsx';

const AccountSidebar = (props: { user: User }) => {
  return (
    <Ui.AccountSidebar>
      <SidebarHeader user={props.user} />
      <SidebarStats />
      <SidebarFooter />
    </Ui.AccountSidebar>
  );
};
export default AccountSidebar;
