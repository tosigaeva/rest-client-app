import { useTranslations } from 'next-intl';
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
  const t = useTranslations('auth.password_checks');
  const checks = [
    { label: t('uppercase'), valid: hasUppercase(password) },
    { label: t('lowercase'), valid: hasLowercase(password) },
    { label: t('special_char'), valid: hasSpecialChar(password) },
    { label: t('min_length'), valid: hasMinLength(password) },
    { label: t('number'), valid: hasNumber(password) },
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
