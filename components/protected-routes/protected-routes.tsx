'use client';
import { useEffect, useState } from 'react';

import { ROUTES } from '@/constants';
import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter } from '@/i18n/navigation';

const authRoutes = [ROUTES.REST, ROUTES.HISTORY, ROUTES.VARIABLES];
const noAuthRoutes = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    const isAuthRoute = authRoutes.includes(pathname);
    const isNoAuthRoute = noAuthRoutes.includes(pathname);

    if (user && isNoAuthRoute) {
      router.replace(ROUTES.MAIN);
      return;
    }

    if (!user && isAuthRoute) {
      router.replace(ROUTES.SIGN_IN);
      return;
    }

    setChecking(false);
  }, [user, loading, pathname, router]);

  // TODO: replace Loading... line to Component
  if (loading || checking) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
}
