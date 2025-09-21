import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

export const AboutCourse = () => {
  const t = useTranslations('aboutCourse');
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between rounded-2xl',
        'border border-neutral-200 bg-fuchsia-50',
        'p-4 shadow dark:bg-neutral-900',
      )}
    >
      <h2 className="font-caprasimo mb-12 text-center text-3xl tracking-tight capitalize">
        {t('react')}
      </h2>
      <h3 className="font-caprasimo text-center text-2xl">{t('description')}</h3>
    </div>
  );
};
