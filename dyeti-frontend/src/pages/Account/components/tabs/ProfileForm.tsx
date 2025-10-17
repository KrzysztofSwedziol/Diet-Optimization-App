import * as Ui from '@/pages/Account/components/tabs/AccountTabs.styles.ts';
import Input from '@/components/Input/Input.tsx';
import Select from '@/components/Select/Select.tsx';
import { Gender, User } from '@/api/types.ts';
import { useState } from 'react';
import { AppButton } from '@/components';
type Props = {
  user: User;
};
const ProfileForm = ({ user }: Props) => {
  const [profile, setProfile] = useState({
    username: user?.username ?? '',
    email: user?.email ?? '',
    age: user?.age?.toString() ?? '',
    gender: (user?.gender as string) ?? '',
    height: user?.height?.toString() ?? '',
    weight: user?.weight?.toString() ?? '',
  });
  const [profileErrors, setProfileErrors] = useState<Partial<typeof profile>>({});
  const [profileGlobalError, setProfileGlobalError] = useState<string>('');
  const onChangeProfile =
    (key: keyof typeof profile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = e.target.value;
      setProfile(s => ({ ...s, [key]: val }));
      // TODO: optional live field validation here
    };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrors({});
    setProfileGlobalError('');
  };
  return (
    <>
      <Ui.ProfileForm onSubmit={handleUpdateProfile}>
        <Ui.FormGridColumn>
          <Input
            label="Username"
            placeholder="Your username"
            value={profile.username}
            onChange={onChangeProfile('username')}
            error={profileErrors.username}
            paddingY={12}
          />
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={profile.email}
            onChange={onChangeProfile('email')}
            error={profileErrors.email}
            paddingY={12}
          />
          <Input
            label="Age"
            type="number"
            placeholder="e.g. 28"
            value={profile.age}
            onChange={onChangeProfile('age')}
            error={profileErrors.age}
            paddingY={12}
          />
        </Ui.FormGridColumn>

        <Ui.FormGridColumn>
          <Select
            paddingY={12}
            label="GENDER"
            value={profile.gender}
            onChange={onChangeProfile('gender')}
            options={[
              { value: Gender.MALE, label: 'Male' },
              { value: Gender.FEMALE, label: 'Female' },
            ]}
            error={profileErrors.gender}
          />
          <Input
            label="Height (cm)"
            type="number"
            placeholder="e.g. 180"
            value={profile.height}
            onChange={onChangeProfile('height')}
            error={profileErrors.height}
            paddingY={12}
          />
          <Input
            label="Weight (kg)"
            type="number"
            placeholder="e.g. 75"
            value={profile.weight}
            onChange={onChangeProfile('weight')}
            error={profileErrors.weight}
            paddingY={12}
          />
        </Ui.FormGridColumn>
      </Ui.ProfileForm>
      <Ui.ProfileActions>
        <AppButton type="submit" disabled={true}>
          Update
        </AppButton>
        {profileGlobalError && <Ui.Error>{profileGlobalError}</Ui.Error>}
      </Ui.ProfileActions>
    </>
  );
};

export default ProfileForm;
