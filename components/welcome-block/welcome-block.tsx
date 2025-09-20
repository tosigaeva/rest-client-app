import { getTranslations } from 'next-intl/server';

import { getCurrentUser } from '@/actions/auth-actions';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { Link } from '@/i18n/navigation';

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

export const WelcomeBlock = async () => {
  const user = await getCurrentUser();
  const username = user?.displayName || user?.email || 'Guest';

  const tBtn = await getTranslations();
  const t = await getTranslations('welcomeBlock');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {user ? (
        <div className="flex w-full flex-col gap-4 text-center">
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl md:text-5xl">
            {t('welcomeBack')}, {username}!
          </h2>
          <div className="flex w-full flex-wrap items-center justify-center gap-3">
            {navItems.map((item) => (
              <div
                className="flex w-full max-w-[calc(100%-1rem)] flex-col items-start rounded-lg border p-3 shadow-md sm:w-[calc(50%-0.75rem)] md:w-[calc(33%-0.75rem)] md:p-4"
                key={item.key}
              >
                <h3 className="mb-1 text-base font-bold sm:text-lg md:text-xl">
                  {t(`${item.key}.title`)}
                </h3>
                <p className="mb-2 text-xs text-gray-600 sm:text-sm md:mb-4 md:text-base">
                  {t(`${item.key}.description`)}
                </p>
                <Link
                  className="mt-auto w-full rounded bg-blue-500 px-2 py-1 text-center text-xs font-medium text-white hover:bg-blue-600 sm:px-3 sm:py-1.5 sm:text-sm md:text-base"
                  href={item.href}
                >
                  {t(`${item.key}.btn`)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-4 text-center md:w-3/4">
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl md:mb-4 md:text-5xl">
            {t('welcome')} RestCafé!
          </h2>
          <h3 className="text-lg sm:text-xl md:text-3xl">{t('descriptionApp')}</h3>
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row sm:gap-3">
              <Button asChild className="w-full text-xs uppercase sm:w-auto sm:text-sm">
                <Link href={ROUTES.SIGN_IN}>{tBtn('signIn')}</Link>
              </Button>
              <Button asChild className="w-full text-xs uppercase sm:w-auto sm:text-sm">
                <Link href={ROUTES.SIGN_UP}>{tBtn('signUp')}</Link>
              </Button>
            </div>
            <h4 className="text-xs sm:text-sm md:text-base">{t('textUnderBtn')}</h4>
          </div>
        </div>
      )}
    </div>
  );
};
