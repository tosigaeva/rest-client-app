import { useTranslations } from 'next-intl';
import { z } from 'zod';

import {
  hasLowercase,
  hasMinLength,
  hasNumber,
  hasSpecialChar,
  hasUppercase,
} from '@/lib/password-utils';

const passwordStrengthTest = (value: string) => {
  return (
    hasUppercase(value) &&
    hasLowercase(value) &&
    hasNumber(value) &&
    hasSpecialChar(value) &&
    hasMinLength(value)
  );
};

export const useValidationSchemas = () => {
  const t = useTranslations('auth.validation');
  return {
    signInSchema: z.object({
      email: z
        .string()
        .nonempty({ message: t('email_required') })
        .email({ message: t('email_invalid') }),
      password: z
        .string()
        .nonempty({ message: t('password_required') })
        .refine(passwordStrengthTest, t('password_invalid')),
    }),
    signUpSchema: z.object({
      email: z
        .string()
        .nonempty({ message: t('email_required') })
        .email({ message: t('email_invalid') }),
      name: z.string().nonempty({ message: t('name_required') }),
      password: z
        .string()
        .nonempty({ message: t('password_required') })
        .refine(passwordStrengthTest, t('password_invalid')),
    }),
  };
};

export type SignInFormData = z.infer<ReturnType<typeof useValidationSchemas>['signInSchema']>;
export type SignUpFormData = z.infer<ReturnType<typeof useValidationSchemas>['signUpSchema']>;
