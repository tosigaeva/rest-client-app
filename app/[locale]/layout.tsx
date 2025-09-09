import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Wrapper } from '@components';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import { Toaster } from '@/components/ui';
import { AuthProvider } from '@/context/auth-context';

import '../globals.css';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  description: 'The REST client for using and building APIs',
  title: 'RestCafé',
};

export default async function RootLayout({
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
          <AuthProvider>
            <Wrapper>
              {children}
              <Toaster />
            </Wrapper>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
