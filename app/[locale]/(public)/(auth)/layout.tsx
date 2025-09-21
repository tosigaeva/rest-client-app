import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getCurrentUser } from '@/actions/auth-actions';
import { ROUTES } from '@/constants';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (user) {
    redirect(ROUTES.MAIN);
  }

  return <>{children}</>;
}
