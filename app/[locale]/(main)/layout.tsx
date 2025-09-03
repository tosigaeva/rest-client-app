import type { ReactNode } from 'react';

import { Footer } from '@/components';
import { Header } from '@/components';

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
