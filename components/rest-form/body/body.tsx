'use client';
import { BodyEditor } from '@components';
import { useTranslations } from 'next-intl';

import { AppProps } from '@/type';

export const Body = ({ user }: AppProps) => {
  const t = useTranslations('rest-client');
  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-fuchsia-50 p-4 shadow dark:bg-neutral-900">
      <h3 className="font-caprasimo text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        {t('body')}
      </h3>
      <BodyEditor user={user} />
    </div>
  );
};
