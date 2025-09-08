'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FloatingInput } from '@/components/floating-input';
import { PasswordChecklist } from '@/components/password-checklist';
import { Button, Form } from '@/components/ui';
import { Link, useRouter } from '@/i18n/navigation';
import { handleFirebaseError, registerUser } from '@/lib/firebase-auth';
import { SignUpFormData, useValidationSchemas } from '@/lib/validation-auth';

export default function SignUpPage() {
  const { signUpSchema } = useValidationSchemas();
  const form = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await registerUser(data.email, data.password);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      handleFirebaseError(error as { code?: string; message?: string }, form.setError);
    }
  };

  return (
    <main>
      <div className="m-full mx-auto mt-24 mb-auto max-w-lg px-8 pt-0 pb-8">
        <h2 className="mb-10 text-center text-[40px]">New Account</h2> {/*text-4xl = 36px*/}
        <Form {...form}>
          <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
            <FloatingInput
              control={form.control}
              error={form.formState.errors.name}
              label="Name"
              name="name"
            />
            <FloatingInput
              control={form.control}
              error={form.formState.errors.email}
              label="Email"
              name="email"
              type="email"
            />
            <FloatingInput
              control={form.control}
              error={form.formState.errors.password}
              label="Password"
              name="password"
              type="password"
            />
            <PasswordChecklist password={form.watch('password') || ''} />
            <Button
              className="mt-8 h-12 cursor-pointer rounded-sm bg-black text-center text-lg text-white"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="mt-5 text-center text-lg">
          Already have an account?
          <Link className="ml-2 cursor-pointer underline" href="sign-in">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
