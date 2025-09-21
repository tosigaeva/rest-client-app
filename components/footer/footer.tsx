'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { DEVELOPERS, RSS_LINK } from '@/constants';
import { cn } from '@/lib/utils';
import { AppProps } from '@/type';

export const Footer = ({ user }: AppProps) => {
  const t = useTranslations('footer');
  return (
    <footer
      className={cn(
        'bg-glass border-bg-300 text-muted w-full border-t py-1 text-center text-sm backdrop-blur-md',
        user
          ? {
              'md:left-64 md:w-[calc(100vw-16rem)]': true,
            }
          : {
              'w-dvw': true,
            },
      )}
    >
      <div className="flex flex-col items-center justify-between px-6 py-1 md:flex-row">
        <div className="flex gap-4">
          {DEVELOPERS.map((author) => (
            <Link
              className="font-caprasimo text-gray-900 hover:text-orange-600"
              href={author.git}
              key={author.name}
              target="_blank"
            >
              {t(author.name)}
            </Link>
          ))}
        </div>

        <span className="font-caprasimo text-sm text-gray-900">&copy; 2025 REST{t('client')} </span>

        <Link href={RSS_LINK} target="_blank">
          <Image alt={t('logo')} height={40} src="rss-logo.svg" width={40} />
        </Link>
      </div>
    </footer>
  );
};
