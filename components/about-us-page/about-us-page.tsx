import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GrGithub } from 'react-icons/gr';

import { DEVELOPERS, ICON } from '@/constants';
import { cn } from '@/lib/utils';

export const AboutUsPage = () => {
  const t = useTranslations('about');
  return (
    <section
      className={cn(
        'w-full rounded-2xl border border-neutral-200',
        'bg-fuchsia-50 p-4 shadow sm:px-6 lg:px-8',
        'dark:bg-neutral-900',
      )}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-caprasimo mb-12 text-center text-3xl font-bold tracking-tight capitalize">
          {t('team')}
        </h2>
        <div className="flex gap-4">
          {DEVELOPERS.map((developer) => (
            <div
              className={cn(
                'developer-card',
                'shadow-lg',
                'transform transition-transform hover:-translate-y-1',
                'w-full',
              )}
              key={developer.name}
            >
              <div
                className={cn(
                  'relative flex gap-3.5 overflow-hidden rounded-xl',
                  'bg-gradient-to-br from-white to-gray-50 p-6',
                )}
              >
                <div className="flex h-45 flex-col items-center justify-center gap-2">
                  <h4 className="font-caprasimo text-center text-2xl font-semibold">
                    {t(`${developer.name}.name`)}
                  </h4>
                  <div
                    className={cn(
                      'relative h-20 w-20 overflow-hidden rounded-full',
                      'border-2 border-gray-200 shadow-md',
                    )}
                  >
                    <Image
                      alt={t(`${developer.name}.name`)}
                      className="absolute inset-0 h-full w-full object-cover"
                      height={80}
                      src={ICON}
                      width={80}
                    />
                  </div>
                  <div
                    className={cn(
                      'font-caprasimo flex cursor-pointer items-center justify-center gap-2',
                      'transition-colors duration-300 hover:text-orange-600',
                    )}
                  >
                    <GrGithub data-testid="github-icon" />
                    <a href={developer.git}>GitHub_{developer.name}</a>
                  </div>
                </div>
                <div className="font-delius flex flex-col items-start">
                  <p className="mb-2 text-center text-sm text-gray-600">
                    Role: {t(`${developer.name}.major`)}
                  </p>
                  <p className="mb-6 text-center text-sm text-gray-800">
                    {t(`${developer.name}.descr`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
