import { z } from 'zod';

export const useValidationSchemas = () => {
  return {
    signUpSchema: z.object({
      email: z
        .string()
        .nonempty({ message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
      name: z.string().nonempty({ message: 'Name is required' }),
      password: z.string().nonempty({ message: 'Password is required' }),
    }),
  };
};

export type SignUpFormData = z.infer<ReturnType<typeof useValidationSchemas>['signUpSchema']>;
