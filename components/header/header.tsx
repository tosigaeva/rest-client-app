'use client';

import { LanguageSelect } from '@components';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GrGroup } from 'react-icons/gr';
import { MdLogout } from 'react-icons/md';

import { Button } from '@/components/ui';
import { ROUTES, STYLE_BUTTON } from '@/constants';
import { signOut } from '@/context/auth-context';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { AppProps } from '@/type';

export const Header = ({ user }: AppProps) => {
  const t = useTranslations('auth');
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onSignOut = async () => {
    try {
      await signOut();
      toast.success(t('toasts.signout_success'));
      router.push(ROUTES.MAIN);
    } catch {
      toast.error(t('toasts.signout_error'));
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-50 flex justify-between transition-all duration-300',
        'w-full md:left-64 md:w-[calc(100vw-16rem)]',
        {
          'h-12 bg-orange-300 py-2 shadow-lg': isSticky,
          'h-16 bg-transparent py-4': !isSticky,
        },
      )}
    >
      <Link className="ml-2" href={'/'}>
        <div className="flex justify-between gap-1.5 pl-4 md:pl-8">
          <Image alt="logo-app" height={20} src="/icon1.png" width={40} />
          <h1 className="font-caprasimo text-4xl font-bold">RestCafé</h1>
        </div>
      </Link>
      <div className="pr-4 md:pr-8">
        <div className="flex h-full items-center justify-between gap-3.5">
          <Link href="/about-us">
            <GrGroup className="h-7 w-7 transition-colors duration-300 hover:text-orange-600" />
          </Link>
          <LanguageSelect />
          {user ? (
            <Button className={STYLE_BUTTON} onClick={onSignOut}>
              <MdLogout />
            </Button>
          ) : (
            <>
              <Button asChild className={STYLE_BUTTON}>
                <Link href={ROUTES.SIGN_IN}>{t('signin')}</Link>
              </Button>
              <Button asChild className={STYLE_BUTTON}>
                <Link href={ROUTES.SIGN_UP}>{t('singup')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
