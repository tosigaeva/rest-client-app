'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FloatingInput } from '@/components/floating-input/floating-input';
import { Button } from '@/components/ui';
import { Form } from '@/components/ui';
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

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
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
            <div className="flex flex-wrap">
              <div className="w-1/2 pt-0.5 text-sm text-[#5f5f5f]">
                <i></i>
                One uppercase letter
              </div>
              <div className="w-1/2 pt-0.5 text-sm text-[#5f5f5f]">
                <i></i>
                One special character
              </div>
              <div className="w-1/2 pt-0.5 text-sm text-[#5f5f5f]">
                <i></i>
                One lowercase letter
              </div>
              <div className="w-1/2 pt-0.5 text-sm text-[#5f5f5f]">
                <i></i>8 characters minimum
              </div>
              <div className="w-1/2 pt-0.5 text-sm text-[#5f5f5f]">
                <i></i>
                One number
              </div>
            </div>
            <Button
              className="mt-8 h-12 cursor-pointer rounded-sm bg-black text-center text-lg text-white"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
