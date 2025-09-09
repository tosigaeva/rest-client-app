'use client';

import { LanguageSelect } from '@components';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GrGroup } from 'react-icons/gr';
import { MdLogout } from 'react-icons/md';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useAuth } from '@/context/auth-context';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export const Header = () => {
  const t = useTranslations('auth');
  const [isSticky, setIsSticky] = useState(false);
  const { signOut, user } = useAuth();
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
    } catch (error) {
      // TODO: delete console.error()
      console.error('Error sign out:', error);
    }
  };

  return (
    <header
      className={cn('fixed top-0 z-50 flex w-full justify-between transition-all duration-300', {
        'h-12 bg-orange-300 py-2 shadow-lg': isSticky,
        'h-16 bg-transparent py-4': !isSticky,
      })}
    >
      <div className="flex justify-between gap-1.5">
        <Image alt="logo-app" height={20} src="/icon1.png" width={33} />
        <h1 className="text-3xl font-bold">RestCafé</h1>
      </div>
      <div>
        <div className="container mx-auto flex h-full items-center justify-between gap-3.5 px-4">
          <Link
            className="text-lg font-bold text-black transition-colors hover:text-orange-600"
            href="/"
          >
            Main
          </Link>
          <Link href="/about-us">
            <GrGroup className="h-7 w-7 transition-colors duration-300 hover:text-orange-600" />
          </Link>
          <LanguageSelect />
          {user ? (
            <Button className="cursor-pointer" onClick={onSignOut}>
              <MdLogout />
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link href={ROUTES.SIGN_IN}>{t('signin')}</Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.SIGN_UP}>{t('singup')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
