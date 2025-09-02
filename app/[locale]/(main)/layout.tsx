import { Footer } from '@/components';
import type { ReactNode } from 'react';

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
