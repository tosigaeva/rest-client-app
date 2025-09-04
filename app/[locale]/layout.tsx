import type { ReactNode } from 'react';

import type { Locale } from '@/constants';

import { Wrapper } from '@/components/wrapper/wrapper';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  return (
    <html lang={(await params).locale || 'en'}>
      <body className="flex min-h-screen flex-col">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
