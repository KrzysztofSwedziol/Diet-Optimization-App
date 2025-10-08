import { User } from '@/api/types.ts';
import * as Ui from '@/pages/Account/Account.styles.ts';
import SidebarHeader from '@/pages/Account/SidebarHeader.tsx';
import SidebarStats from '@/pages/Account/SidebarStats.tsx';
import SidebarFooter from '@/pages/Account/SidebarFooter.tsx';

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
