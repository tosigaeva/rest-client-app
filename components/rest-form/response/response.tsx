'use client';

import { BodyEditor, Spinner } from '@components';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { AppProps } from '@/type';

export const RestResponse = ({ user }: AppProps) => {
  const t = useTranslations('rest-client');
  const { loading, response } = useSelector((state: RootState) => state.restRequest);

  if (loading) return <Spinner />;
  if (!response) return <p>{t('No-response')}</p>;

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-fuchsia-50 p-4 shadow dark:bg-neutral-900">
      <div className="flex items-center gap-2 text-sm">
        <h3 className="font-caprasimo font-semibold text-neutral-800 dark:text-neutral-100">
          {t('status')}:
        </h3>
        <span
          className={`font-medium ${
            response.status >= 200 && response.status < 300
              ? 'text-green-600'
              : response.status >= 300 && response.status < 400
                ? 'text-blue-600'
                : response.status >= 400
                  ? 'text-red-600'
                  : 'text-gray-500'
          }`}
        >
          {response.status}
        </span>
      </div>
      <div className="flex items-start gap-2 text-sm">
        <h3 className="font-caprasimo font-semibold text-neutral-800 dark:text-neutral-100">
          {t('body')}:
        </h3>
        <div className="flex-1 overflow-scroll">
          <BodyEditor initialBody={response.data} readOnly user={user} />
        </div>
      </div>
    </div>
  );
};
