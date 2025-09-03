'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant="outline">
                Language Toggle
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => alert('Selected: Russian')}>
                Russian
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => alert('Selected: English')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => alert('Selected: English')}>
                Belarusian
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="cursor-pointer">Sing In</Button>
          <Button className="cursor-pointer">Sing Up</Button>
        </div>
      </div>
    </header>
  );
};
