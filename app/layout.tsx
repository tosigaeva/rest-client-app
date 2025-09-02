import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RestCafé',
  description: 'The REST client for using and building APIs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
