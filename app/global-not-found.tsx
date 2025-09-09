import type { Metadata } from 'next';

import './globals.css';
import { Inter } from 'next/font/google';

import { NotFoundPage } from '@/components/not-found-page';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'The page you are looking for does not exist.',
  title: '404 - Page Not Found',
};

export default function GlobalNotFound() {
  return (
    <html className={inter.className} lang="en">
      <body>
        <NotFoundPage />
      </body>
    </html>
  );
}
