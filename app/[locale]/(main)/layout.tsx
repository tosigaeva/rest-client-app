import type { ReactNode } from 'react';

import { Footer } from '@/components';

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
