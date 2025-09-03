import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  description: 'The REST client for using and building APIs',
  title: 'RestCafé',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
