import type { ReactNode } from 'react';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { Wrapper } from '@/components/wrapper/wrapper';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={(await params).locale || 'en'}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Wrapper>{children}</Wrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
