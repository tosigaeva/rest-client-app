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
  return {
    signUpSchema: z.object({
      email: z
        .string()
        .nonempty({ message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
      name: z.string().nonempty({ message: 'Name is required' }),
      password: z
        .string()
        .nonempty({ message: 'Password is required' })
        .refine(passwordStrengthTest, 'Invalid Password'),
    }),
  };
};

export type SignUpFormData = z.infer<ReturnType<typeof useValidationSchemas>['signUpSchema']>;
