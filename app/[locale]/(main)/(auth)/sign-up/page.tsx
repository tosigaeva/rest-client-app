'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { cn } from '@/lib/utils';
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
            <div className="mb-3">
              <div className="relative text-base">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          placeholder=""
                          type="text"
                          {...field}
                          className={cn(
                            'peer w-full rounded-sm border px-3.5 pt-5 pb-2 outline-none focus:border-black',
                            {
                              'border-gray-300': !form.formState.errors.name,
                              'border-red-500 focus:border-red-500': form.formState.errors.name,
                            },
                          )}
                        />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          'peer-focus: peer-focus: peer-focus: absolute top-3 left-3.5 bg-white px-1 text-[12px] text-[#979797] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black',
                          {
                            '-top-2.5 border-gray-300 text-sm': field.value,
                            'top-3 text-base': !field.value,
                          },
                        )}
                      >
                        Name
                      </FormLabel>
                      {form.formState.errors.name && (
                        <FormMessage className="absolute top-0 right-0 rounded-tr-sm bg-red-500 px-1 text-[10px] text-white">
                          {form.formState.errors.name.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="relative text-base">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          placeholder=""
                          type="email"
                          {...field}
                          className={cn(
                            'peer w-full rounded-sm border px-3.5 pt-5 pb-2 outline-none focus:border-black',
                            {
                              'border-gray-300': !form.formState.errors.email,
                              'border-red-500 focus:border-red-500': form.formState.errors.email,
                            },
                          )}
                        />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          'peer-focus: peer-focus: peer-focus: absolute top-3 left-3.5 bg-white px-1 text-[12px] text-[#979797] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black',
                          {
                            '-top-2.5 border-gray-300 text-sm': field.value,
                            'top-3 text-base': !field.value,
                          },
                        )}
                      >
                        Email
                      </FormLabel>
                      {form.formState.errors.email && (
                        <FormMessage className="absolute top-0 right-0 rounded-tr-sm bg-red-500 px-1 text-[10px] text-white">
                          {form.formState.errors.email.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="relative text-base">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          placeholder=""
                          type="password"
                          {...field}
                          className={cn(
                            'peer w-full rounded-sm border px-3.5 pt-5 pb-2 outline-none focus:border-black',
                            {
                              'border-gray-300': !form.formState.errors.password,
                              'border-red-500 focus:border-red-500': form.formState.errors.password,
                            },
                          )}
                        />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          'peer-focus: peer-focus: peer-focus: absolute top-3 left-3.5 bg-white px-1 text-[12px] text-[#979797] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black',
                          {
                            '-top-2.5 border-gray-300 text-sm': field.value,
                            'top-3 text-base': !field.value,
                          },
                        )}
                      >
                        Password
                      </FormLabel>
                      {form.formState.errors.password && (
                        <FormMessage className="absolute top-0 right-0 rounded-tr-sm bg-red-500 px-1 text-[10px] text-white">
                          {form.formState.errors.password.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
