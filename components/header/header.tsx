'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '../ui/button';

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 flex w-full justify-between transition-all duration-300 ${
        isSticky ? 'h-12 bg-orange-300 py-2 shadow-lg' : 'h-16 bg-transparent py-4'
      }`}
    >
      <div className="flex justify-between gap-1.5">
        <Image alt="logo-app" height={20} src="/icon1.png" width={33} />
        <h1 className="text-3xl font-bold">RestCafé</h1>
      </div>
      <div>
        <div className="container mx-auto flex h-full items-center justify-between gap-3.5 px-4">
          <Link
            className="text-lg font-bold text-black transition-colors hover:text-orange-600"
            href="/"
          >
            Main
          </Link>
          <Button className="cursor-pointer">Sing In</Button>
          <Button className="cursor-pointer">Sing Up</Button>
        </div>
      </div>
    </header>
  );
};
