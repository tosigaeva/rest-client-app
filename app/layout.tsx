import type { Metadata } from 'next';

import './globals.css';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  description: 'The REST client for using and building APIs',
  title: 'RestCafé',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
