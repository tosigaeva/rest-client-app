import type { ReactNode } from 'react';

import { Footer, Header } from '@components';

import { getCurrentUser } from '@/actions/auth-actions';

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
