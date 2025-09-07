'use client';

import React from 'react';

type SpinnerProps = {
  size?: 'lg' | 'md' | 'sm';
};

export const Spinner = ({ size = 'md' }: SpinnerProps) => {
  const sizeClasses = {
    lg: 'h-24 w-24',
    md: 'h-16 w-16',
    sm: 'h-10 w-10',
  };

  return (
    <section className="flex h-80 items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <div
          aria-label={'Loaded'}
          className={`absolute h-full w-full rounded-full border-4 border-gray-200 border-t-blue-500 ${''}`}
          role="status"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/90">
          <span className="font-bold text-blue-500">{'Ready'}</span>
        </div>
      </div>
    </section>
  );
};
