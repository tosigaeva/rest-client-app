'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Link } from '@/i18n/navigation';

type SignUpForm = {
  email: string;
  fullName: string;
  password: string;
};

export default function SignUpPage() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpForm>();
  const onSubmit: SubmitHandler<SignUpForm> = (data) => console.log(data.email);

  return (
    <main>
      <div className="m-full mx-auto mt-24 mb-auto max-w-lg px-8 pt-0 pb-8">
        <h2 className="mb-10 text-center text-[40px]">New Account</h2> {/*text-4xl = 36px*/}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <div className="relative text-base">
              <input
                className="peer font-base w-full resize-none rounded-sm border px-3.5 py-3 outline-none focus:border-black focus:outline-none"
                {...register('email', { minLength: 3, required: true })}
                aria-invalid={errors.email ? 'true' : 'false'}
                placeholder=" "
              />
              <label className="peer-focus: peer-focus: peer-focus: absolute top-3 left-3.5 bg-white px-1 text-[12px] text-[#979797] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black">
                Email
              </label>
              {errors.email && (
                <span className="absolute top-0 right-0 rounded-tr-sm bg-red-500 px-1 text-[8px] text-white">
                  {errors.email.type === 'required' ? 'Rrequired' : 'Too short'}
                </span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <div className="relative text-base">
              <input
                className="peer font-base w-full resize-none rounded-sm border px-3.5 py-3 outline-none focus:border-black focus:outline-none"
                {...register('fullName', { minLength: 2, required: true })}
                aria-invalid={errors.fullName ? 'true' : 'false'}
                placeholder=" "
              />
              <label className="peer-focus: peer-focus: peer-focus: absolute top-3 left-3.5 bg-white px-1 text-[6px] text-[#979797] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black">
                Full name
              </label>
              {errors.fullName && (
                <span className="absolute top-0 right-0 rounded-tr-sm bg-red-500 px-1 text-[8px] text-white">
                  {errors.fullName.type === 'required' ? 'Rrequired' : 'Too short'}
                </span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <div className="relative text-base">
              <input
                className="peer font-base w-full resize-none rounded-sm border px-3.5 py-3 outline-none focus:border-black focus:outline-none"
                {...register('password', { minLength: 5, required: true })}
                aria-invalid={errors.password ? 'true' : 'false'}
                placeholder=" "
              />
              <label className="peer-focus: peer-focus: peer-focus: absolute top-3 left-3.5 bg-white px-1 text-[6px] text-[#979797] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black">
                Password
              </label>
              {errors.password && (
                <span className="absolute top-0 right-0 rounded-tr-sm bg-red-500 px-1 text-[8px] text-white">
                  {errors.password.type === 'required' ? 'Rrequired' : 'Too short'}
                </span>
              )}
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
          <button
            className="mt-8 h-12 cursor-pointer rounded-sm bg-black text-center text-lg text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
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
