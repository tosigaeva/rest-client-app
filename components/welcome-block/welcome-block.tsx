import { getTranslations } from 'next-intl/server';

import { getCurrentUser } from '@/actions/auth-actions';
import { Button } from '@/components/ui';
import { ROUTES, STYLE_BUTTON } from '@/constants';
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
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-fuchsia-50 p-4 shadow dark:bg-neutral-900">
      {user ? (
        <div className="flex w-full flex-col gap-7 text-center">
          <h1 className="font-caprasimo mb-4 text-5xl font-bold">
            {t('welcomeBack')}, {username}!
          </h1>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {navItems.map((item) => (
              <div
                className="developer-card max-w-[320px] transform shadow-md transition-transform hover:-translate-y-1 sm:max-w-full"
                key={item.key}
              >
                <div className="relative flex h-[200px] items-start gap-3.5 overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6">
                  <div className="flex h-full w-full flex-col">
                    <h3 className="font-caprasimo mb-2 text-xl font-bold">
                      {t(`${item.key}.title`)}
                    </h3>
                    <p className="font-delius mb-4 flex-1 text-center text-gray-600">
                      {t(`${item.key}.description`)}
                    </p>
                    <div className="mt-auto">
                      <Link
                        className="font-caprasimo block w-full rounded bg-fuchsia-200 px-4 py-2 text-center text-lg font-medium text-black hover:bg-fuchsia-400"
                        href={item.href}
                      >
                        {t(`${item.key}.btn`)}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-3/4 flex-col justify-center gap-8 text-center">
          <h1 className="font-caprasimo mb-4 text-5xl font-bold">{t('welcome')} RestCafé!</h1>
          <h3 className="font-caprasimo text-3xl">{t('descriptionApp')}</h3>
          <div className="flex flex-col gap-1">
            <div className="flex justify-center gap-4">
              <Button asChild className={STYLE_BUTTON}>
                <Link href={ROUTES.SIGN_IN}>{tBtn('signIn')}</Link>
              </Button>
              <Button asChild className={STYLE_BUTTON}>
                <Link href={ROUTES.SIGN_UP}>{tBtn('signUp')}</Link>
              </Button>
            </div>
            <h4 className="text-1xl font-caprasimo">{t('textUnderBtn')}</h4>
          </div>
        </div>
      )}
    </div>
  );
};
