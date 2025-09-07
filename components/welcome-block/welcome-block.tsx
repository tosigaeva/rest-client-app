'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@/i18n/navigation';

import { Button } from '../ui';

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

  // Локальное состояние для тестирования
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Функция для переключения состояния (для теста)
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {isAuthenticated ? (
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
        <div className="text-center">
          <h2 className="mb-4 text-5xl font-bold">{t('welcome')} RestCafé!</h2>
          <div className="flex justify-center gap-4">
            <Button className="cursor-pointer">{tBtn('signIn')}</Button>
            <Button className="cursor-pointer">{tBtn('signUp')}</Button>
          </div>
        </div>
      )}
      {/* Кнопка для ручного переключения состояния (только для теста) */}
      <Button className="mt-4" onClick={toggleAuth}>
        {isAuthenticated ? 'Logout (Test)' : 'Login (Test)'}
      </Button>
    </div>
  );
};
