import * as Ui from '@/pages/Account/Account.styles.ts';
import dyetiGirl from '@/assets/girl.svg';
import dyetiBoy from '@/assets/dyeti-happy.svg';
import { Gender, User } from '@/api/types.ts';

const SidebarHeader = (props: { user: User }) => {
  return (
    <>
      <Ui.LogoContainer>
        <Ui.Logo src={props.user.gender === Gender.MALE ? dyetiBoy : dyetiGirl} alt="DYeti logo" />
      </Ui.LogoContainer>
      <Ui.Username>{props.user.username}</Ui.Username>
      <Ui.Email>{props.user.email}</Ui.Email>
    </>
  );
};

export default SidebarHeader;
