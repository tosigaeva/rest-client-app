import type { ReactNode } from 'react';

import { Footer, Header } from '@components';

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
