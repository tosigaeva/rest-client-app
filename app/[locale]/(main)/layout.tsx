import { Footer } from '@/components';
import type { ReactNode } from 'react';

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
