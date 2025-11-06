import Requirement from '@/pages/Account/components/tabs/details/Requirement.tsx';
import { NewPwdReqState } from '@/pages/Account/hooks/CheckPasswordReq.ts';

type Props = {
  requirements: NewPwdReqState;
};
const PasswordRequirements = ({ requirements }: Props) => {
  const pwdRequirement: Array<[boolean, string]> = [
    [requirements.providedCurrent, 'Current password required'],
    [requirements.providedNew, 'New password required'],
    [requirements.minLength, 'Min. 8 characters'],
    [requirements.special, 'At least one special character'],
    [requirements.passwordMatch, 'Passwords match'],
  ];

  return (
    <>
      {pwdRequirement.map(([fulfilled, message], i) => (
        <Requirement key={i} fulfilled={fulfilled} message={message} />
      ))}
    </>
  );
};
export default PasswordRequirements;
