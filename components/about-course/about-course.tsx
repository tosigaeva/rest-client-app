import { useTranslations } from 'next-intl';

export const AboutCourse = () => {
  const t = useTranslations('aboutCourse');
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 text-center md:w-3/4">
      <h2 className="mb-12 text-center text-4xl font-bold tracking-tight capitalize">
        {t('react')}
      </h2>
      <h3 className="sm:text-l text-lg md:text-xl">{t('description')}</h3>
    </div>
  );
};
