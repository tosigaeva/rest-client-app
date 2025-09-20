'use client';

import { FloatingInput } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button, Form } from '@/components/ui';
import { ROUTES, STYLE_BUTTON } from '@/constants';
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
      <div className="m-full mx-auto mt-35 mb-auto max-w-lg rounded-xl border border-gray-200 bg-fuchsia-50 px-8 pt-6 pb-8 shadow-sm dark:bg-gray-800">
        <h2 className="font-caprasimo mb-3 text-center text-3xl">{t('signin_page.title')}</h2>
        <p className="font-delius mb-7 text-center text-xl font-light">
          {t('signin_page.subtitle')}
        </p>
        <Form {...form}>
          <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button className={STYLE_BUTTON} type="submit">
              {t('signin')}
            </Button>
          </form>
        </Form>
        <div className="font-delius mt-5 text-center text-lg">
          {t('signin_page.no_account')}
          <Link className="font-caprasimo ml-2 cursor-pointer underline" href={ROUTES.SIGN_UP}>
            {t('singup')}
          </Link>
        </div>
      </div>
    </main>
  );
}
