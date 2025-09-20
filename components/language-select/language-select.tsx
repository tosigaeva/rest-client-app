'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { GrLanguage } from 'react-icons/gr';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export const LanguageSelect = () => {
  const t = useTranslations('languageSwitcher');

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locales = routing.locales;

  const handleLanguageChange = (language: typeof locale): void => {
    const params = searchParams.toString();
    const url = params ? `/${pathname}?${params}` : `/${pathname}`;
    router.push(url, { locale: language });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <GrLanguage className="mr-1 h-5 w-5" />
          {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-delius">
        {locales.map((lang) => (
          <DropdownMenuItem key={lang} onSelect={() => handleLanguageChange(lang)}>
            {t(`${lang}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
