import * as Ui from '../AccountTabs.styles.ts';
import { User } from '@/api/types.ts';
import ProfileForm from './ProfileForm.tsx';
import PasswordForm from '@/pages/Account/components/tabs/details/PasswordForm.tsx';
type Props = {
  user: User;
};
const DetailsTab = ({ user }: Props) => {
  return (
    <Ui.SettingsGrid>
      <ProfileForm user={user} />
      <PasswordForm />
    </Ui.SettingsGrid>
  );
};

export default DetailsTab;
