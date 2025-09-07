import { MdDone, MdFiberManualRecord } from 'react-icons/md';

import {
  hasLowercase,
  hasMinLength,
  hasNumber,
  hasSpecialChar,
  hasUppercase,
} from '@/lib/password-utils';

type Props = {
  password: string;
};

export function PasswordChecklist({ password }: Props) {
  const checks = [
    { label: 'One uppercase letter', valid: hasUppercase(password) },
    { label: 'One lowercase letter', valid: hasLowercase(password) },
    { label: 'One special character', valid: hasSpecialChar(password) },
    { label: '8 characters minimum', valid: hasMinLength(password) },
    { label: 'One number', valid: hasNumber(password) },
  ];

  return (
    <div className="flex flex-wrap">
      {checks.map((check) => (
        <div
          className="flex w-1/2 items-center gap-2 pt-0.5 text-sm"
          key={check.label}
          style={{ color: check.valid ? '#9ca3af' : 'black' }}
        >
          <span className="font-bold">{check.valid ? <MdDone /> : <MdFiberManualRecord />}</span>
          {check.label}
        </div>
      ))}
    </div>
  );
}
