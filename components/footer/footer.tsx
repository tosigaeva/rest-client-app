import Image from 'next/image';
import Link from 'next/link';

import { AUTHOR_GITHUBS, RSS_LINK } from '@/constants';

export const Footer = () => {
  return (
    <footer className="bg-glass border-bg-300 text-muted w-full border-t py-1 text-center text-sm backdrop-blur-md">
      <div className="container mx-auto flex flex-col items-center justify-between px-6 py-1 md:flex-row">
        <div className="flex gap-4">
          {AUTHOR_GITHUBS.map((author) => (
            <Link
              className="text-gray-900 hover:text-orange-600"
              href={author.url}
              key={author.name}
              target="_blank"
            >
              {author.name}
            </Link>
          ))}
        </div>

        <span className="text-sm text-gray-900">&copy; 2025 REST Client App </span>

        <Link href={RSS_LINK} target="_blank">
          <Image alt="RS School logo" height={40} src="/rss-logo.svg" width={40} />
        </Link>
      </div>
    </footer>
  );
};
