'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FloatingInput } from '@/components/floating-input';
import { Button, Form } from '@/components/ui';
import { ROUTES } from '@/constants';
import { Link, useRouter } from '@/i18n/navigation';
import { handleFirebaseError, signInUser } from '@/lib/firebase-auth';
import { SignInFormData, useValidationSchemas } from '@/lib/validation-auth';

export default function SignUpPage() {
  const t = useTranslations('auth');
  const { signInSchema } = useValidationSchemas();
  const form = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signInUser(data.email, data.password);
      toast.success(t('toasts.signin_success'));
      router.push(ROUTES.MAIN);
    } catch (error) {
      handleFirebaseError(error as { code?: string; message?: string }, t, form.setError);
    }
  };

  return (
    <main>
      <div className="m-full mx-auto mt-24 mb-auto max-w-lg px-8 pt-0 pb-8">
        <h2 className="text-xxl mb-3 text-center">{t('signin_page.title')}</h2>
        <p className="mb-7 text-center text-xl font-light">{t('signin_page.subtitle')}</p>
        <Form {...form}>
          <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
            <FloatingInput
              control={form.control}
              error={form.formState.errors.email}
              label={t('email')}
              name="email"
              type="email"
            />
            <FloatingInput
              control={form.control}
              error={form.formState.errors.password}
              label={t('password')}
              name="password"
              type="password"
            />
            <Button
              className="mt-8 h-12 cursor-pointer rounded-sm bg-black text-center text-lg text-white"
              type="submit"
            >
              {t('signin')}
            </Button>
          </form>
        </Form>
        <div className="mt-5 text-center text-lg">
          {t('signin_page.no_account')}
          <Link className="ml-2 cursor-pointer underline" href={ROUTES.SIGN_UP}>
            {t('singup')}
          </Link>
        </div>
      </div>
    </main>
  );
}
