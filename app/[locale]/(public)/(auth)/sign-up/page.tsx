'use client';

import { FloatingInput, PasswordChecklist } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button, Form } from '@/components/ui';
import { ROUTES, STYLE_BUTTON } from '@/constants';
import { Link, useRouter } from '@/i18n/navigation';
import { handleFirebaseError, registerUser } from '@/lib/firebase-auth';
import { SignUpFormData, useValidationSchemas } from '@/lib/validation-auth';

export default function SignUpPage() {
  const t = useTranslations('auth');
  const { signUpSchema } = useValidationSchemas();
  const form = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    mode: 'all',
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await registerUser(data.email, data.password, data.name);
      toast.success(t('toasts.signup_success'));
      router.push(ROUTES.MAIN);
    } catch (error) {
      handleFirebaseError(error as { code?: string; message?: string }, t, form.setError);
    }
  };

  return (
    <main>
      <div className="m-full mx-auto mt-35 mb-auto max-w-lg rounded-xl border border-gray-200 bg-fuchsia-50 px-8 pt-6 pb-8 shadow-sm dark:bg-gray-800">
        <h2 className="font-caprasimo mb-10 text-center text-3xl">{t('signup_page.title')}</h2>
        <Form {...form}>
          <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
            <FloatingInput
              control={form.control}
              error={form.formState.errors.name}
              label={t('name')}
              name="name"
            />
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
            <PasswordChecklist password={form.watch('password') || ''} />
            <Button className={STYLE_BUTTON} type="submit">
              {t('singup')}
            </Button>
          </form>
        </Form>
        <div className="font-delius mt-5 text-center text-lg">
          {t('signup_page.have_account')}
          <Link className="font-caprasimo ml-2 cursor-pointer underline" href={ROUTES.SIGN_IN}>
            {t('signin')}
          </Link>
        </div>
      </div>
    </main>
  );
}
