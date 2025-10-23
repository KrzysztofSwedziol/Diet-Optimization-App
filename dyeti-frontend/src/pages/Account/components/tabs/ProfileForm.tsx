import * as Ui from '@/pages/Account/components/tabs/AccountTabs.styles';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import { Gender, User } from '@/api/types';
import { AppButton } from '@/components';
import { useProfileForm } from '@/pages/Account/hooks/useProfileForm.ts';

type Props = { user: User };

const ProfileForm = ({ user }: Props) => {
  const { profile, errors, globalError, successMsg, isPending, isDirty, onChange, onSubmit } = useProfileForm(user);

  return (
    <>
      <Ui.ProfileForm id="profileForm" onSubmit={onSubmit}>
        <Ui.FormGridColumn>
          <Input
            label="Username"
            placeholder="Your username"
            value={profile.username}
            onChange={onChange('username')}
            error={errors.username}
            paddingY={12}
          />
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={profile.email}
            onChange={onChange('email')}
            error={errors.email}
            paddingY={12}
          />
          <Input
            label="Age"
            type="number"
            placeholder="e.g. 28"
            value={profile.age}
            onChange={onChange('age')}
            error={errors.age}
            paddingY={12}
          />
        </Ui.FormGridColumn>

        <Ui.FormGridColumn>
          <Select
            paddingY={12}
            label="GENDER"
            value={profile.gender}
            onChange={onChange('gender')}
            options={[
              { value: Gender.MALE, label: 'Male' },
              { value: Gender.FEMALE, label: 'Female' },
            ]}
            error={errors.gender}
          />
          <Input
            label="Height (cm)"
            type="number"
            placeholder="e.g. 180"
            value={profile.height}
            onChange={onChange('height')}
            error={errors.height}
            paddingY={12}
          />
          <Input
            label="Weight (kg)"
            type="number"
            placeholder="e.g. 75"
            value={profile.weight}
            onChange={onChange('weight')}
            error={errors.weight}
            paddingY={12}
          />
        </Ui.FormGridColumn>
      </Ui.ProfileForm>

      <Ui.ProfileActions>
        <AppButton type="submit" form="profileForm" disabled={isPending || !isDirty}>
          {isPending ? 'Updating…' : 'Update'}
        </AppButton>
        {globalError && <Ui.Error>{globalError}</Ui.Error>}
        {successMsg && <Ui.Success>{successMsg}</Ui.Success>}
      </Ui.ProfileActions>
    </>
  );
};

export default ProfileForm;
