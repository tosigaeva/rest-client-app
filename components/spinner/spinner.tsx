import React from 'react';

import { cn } from '@/lib/utils';

export const Spinner = () => {
  return (
    <section className="flex h-80 items-center justify-center">
      <div className="relative h-16 w-16">
        <div
          aria-label="Loading..."
          className={cn(
            'absolute h-full w-full',
            'animate-spin rounded-full',
            'border-4 border-gray-200 border-t-blue-500',
          )}
          role="status"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/90">
          <span className="font-bold text-blue-500">Loading...</span>
        </div>
      </div>
    </section>
  );
};
