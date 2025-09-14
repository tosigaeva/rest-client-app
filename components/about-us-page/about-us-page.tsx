import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GrGithub } from 'react-icons/gr';

import { DEVELOPERS, ICON } from '@/constants';
import { cn } from '@/lib/utils';

export const AboutUsPage = () => {
  const t = useTranslations('about');
  return (
    <section className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight capitalize">
          {t('team')}
        </h2>
        <div className="developers-grid">
          {DEVELOPERS.map((developer, index) => (
            <div
              className={cn(
                'developer-card',
                'shadow-lg',
                'transform transition-transform hover:-translate-y-1',
                index === 0 ? 'top-center' : index === 1 ? 'bottom-left' : 'bottom-right',
              )}
              key={developer.name}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6">
                <h4 className="mb-4 text-center text-2xl font-semibold">
                  {t(`${developer.name}.name`)}
                </h4>
                <div className="mb-4 flex justify-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 shadow-md">
                    <Image
                      alt={t(`${developer.name}.name`)}
                      className="absolute inset-0 h-full w-full object-cover"
                      height={80}
                      src={ICON}
                      width={80}
                    />
                  </div>
                </div>
                <p className="mb-2 text-center text-sm text-gray-600">
                  Role: {t(`${developer.name}.major`)}
                </p>
                <p className="mb-6 text-center text-sm text-gray-800">
                  {t(`${developer.name}.descr`)}
                </p>
                <div
                  className={cn(
                    'mt-auto flex cursor-pointer items-center justify-center gap-2',
                    'transition-colors duration-300 hover:text-orange-600',
                  )}
                >
                  <GrGithub />
                  <a href={developer.git}>GitHub_{developer.name}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
