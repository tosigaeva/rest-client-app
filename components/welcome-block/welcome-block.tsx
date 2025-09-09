'use client';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useAuth } from '@/context/auth-context';
import { Link } from '@/i18n/navigation';

interface WelcomeBlockProps {
  username: string;
}

const navItems = [
  {
    href: '/rest',
    key: 'restClient',
  },
  {
    href: '/history',
    key: 'history',
  },
  {
    href: '/variables',
    key: 'variables',
  },
];

export const WelcomeBlock = ({ username }: WelcomeBlockProps) => {
  const tBtn = useTranslations();
  const t = useTranslations('welcomeBlock');

  const { loading, user } = useAuth();

  if (loading) {
    // TODO: replace Loading line to Component
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {user ? (
        <div className="flex flex-col gap-7 text-center">
          <h2 className="mb-4 text-5xl font-bold">
            {t('welcomeBack')}, {username}!
          </h2>
          <div className="flex justify-center gap-6">
            {navItems.map((item) => (
              <div
                className="flex w-64 flex-col items-start rounded-lg border p-6 shadow-md"
                key={item.key}
              >
                <h3 className="mb-2 text-xl font-bold">{t(`${item.key}.title`)}</h3>
                <p className="mb-4 text-base text-gray-600">{t(`${item.key}.description`)}</p>
                <Link
                  className="mt-auto w-full rounded bg-blue-500 px-4 py-2 text-center text-lg font-medium text-white hover:bg-blue-600"
                  href={item.href}
                >
                  {t(`${item.key}.btn`)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-3/4 flex-col justify-center gap-8 text-center">
          <h2 className="mb-4 text-5xl font-bold">{t('welcome')} RestCafé!</h2>
          <h3 className="text-3xl">{t('descriptionApp')}</h3>
          <div className="flex flex-col gap-1">
            <div className="flex justify-center gap-4">
              <Button asChild className="uppercase">
                <Link href={ROUTES.SIGN_IN}>{tBtn('signIn')}</Link>
              </Button>
              <Button asChild className="uppercase">
                <Link href={ROUTES.SIGN_UP}>{tBtn('signUp')}</Link>
              </Button>
            </div>
            <h4 className="text-1xl">{t('textUnderBtn')}</h4>
          </div>
        </div>
      )}
    </div>
  );
};
