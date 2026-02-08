import { useCallback, useMemo, useState } from 'react';
import { Gender, UpdateProfileRequest, User } from '@/api/types';
import { useUpdateProfile } from '@/api/user/hooks';

type ProfileState = {
  username: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
};

export type FieldErrors = Partial<Record<keyof ProfileState, string>>;

const toInt = (v: string) => {
  const n = Number.parseInt(v.trim(), 10);
  return Number.isFinite(n) ? n : NaN;
};

const validate = (s: ProfileState): FieldErrors => {
  const e: FieldErrors = {};
  if (!s.username.trim()) e.username = 'Username is required';
  if (!s.email.trim()) e.email = 'Email is required';
  if (!/^\d+$/.test(s.age)) e.age = 'Age must be an integer';
  if (!s.gender) e.gender = 'Gender is required';
  if (!/^\d+$/.test(s.height)) e.height = 'Height must be an integer';
  if (!/^\d+$/.test(s.weight)) e.weight = 'Weight must be an integer';
  return e;
};

const buildPayload = (s: ProfileState): UpdateProfileRequest => ({
  username: s.username.trim(),
  email: s.email.trim(),
  age: toInt(s.age),
  gender: s.gender as Gender,
  height: toInt(s.height),
  weight: toInt(s.weight),
});

export const useProfileForm = (user: User | null) => {
  const [profile, setProfile] = useState<ProfileState>({
    username: user?.username ?? '',
    email: user?.email ?? '',
    age: user?.age?.toString() ?? '',
    gender: (user?.gender as string) ?? '',
    height: user?.height?.toString() ?? '',
    weight: user?.weight?.toString() ?? '',
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const onChange = useCallback(
    (key: keyof ProfileState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = e.target.value;
      setProfile(s => ({ ...s, [key]: val }));
      setErrors(prev => ({ ...prev, [key]: undefined }));
      setSuccessMsg('');
    },
    [],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});
      setGlobalError('');

      const v = validate(profile);
      if (Object.keys(v).length) {
        setErrors(v);
        return;
      }

      try {
        const res = await updateProfile(buildPayload(profile));
        setSuccessMsg(res?.message ?? 'Profile updated');
      } catch (err) {
        // proste, ogólne złapanie błędu bez dodatkowych formatów
        setGlobalError(err instanceof Error ? err.message : 'Update failed');
      }
    },
    [profile, updateProfile],
  );

  const isDirtyFromUser = (profile: ProfileState, user: User | null) => {
    if (!user) return true;
    return (
      profile.username !== (user.username ?? '') ||
      profile.email !== (user.email ?? '') ||
      profile.age !== (user.age?.toString() ?? '') ||
      profile.gender !== ((user.gender as string) ?? '') ||
      profile.height !== (user.height?.toString() ?? '') ||
      profile.weight !== (user.weight?.toString() ?? '')
    );
  };

  const isDirty = useMemo(() => isDirtyFromUser(profile, user), [profile, user]);

  return {
    profile,
    errors,
    globalError,
    successMsg,
    isPending,
    isDirty,
    onChange,
    onSubmit,
  };
};
