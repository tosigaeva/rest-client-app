'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GrFormPreviousLink } from 'react-icons/gr';

import { cn } from '@/lib/utils';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-20">
      <Image alt={'non-found'} height={600} src="/non-found.png" width={600} />
      <Link
        className={cn(
          'flex cursor-pointer items-center gap-2',
          'border border-gray-200 bg-white text-3xl text-black',
          'shadow-md transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg',
          'rounded-lg px-6 py-2',
          'hover:scale-105 active:scale-95',
          'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
        )}
        href={'/'}
      >
        <GrFormPreviousLink className="h-8 w-8" />
        Back to the Beginning
      </Link>
    </div>
  );
};
