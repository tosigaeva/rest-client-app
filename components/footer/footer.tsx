import Link from 'next/link';
import { AUTHOR_GITHUBS } from '@/constants';

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

        <Link href="https://rs.school/courses/reactjs" target="_blank">
          6666
        </Link>
      </div>
    </footer>
  );
};
