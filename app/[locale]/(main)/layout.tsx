import type { ReactNode } from 'react';

import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
