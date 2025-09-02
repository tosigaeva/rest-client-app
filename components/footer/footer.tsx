import Link from 'next/link';
import Image from 'next/image';
import { AUTHOR_GITHUBS, RSS_LINK } from '@/constants';

export const Footer = () => {
  return (
    <footer className="w-full bg-glass backdrop-blur-md border-t border-bg-300 py-4 text-center text-muted text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6">
        <div className="flex gap-4">
          {AUTHOR_GITHUBS.map((author) => (
            <Link key={author.name} href={author.url} target="_blank" className="hover:text-gray-900">
              {author.name}
            </Link>
          ))}
        </div>

        <span className="text-sm">&copy; 2025 REST Client App </span>

        <Link href={RSS_LINK} target="_blank">
          <Image src=".logos/rss-logo.svg" alt="RS School"/>
        </Link>
      </div>
    </footer>
  );
};
