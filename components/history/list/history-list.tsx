import { HistoryItem } from '@components';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/actions/auth-actions';
import { ROUTES } from '@/constants';
import { getUserRequestHistory, RequestLog } from '@/lib/history';

export default async function HistoryList() {
  const t = await getTranslations('history');
  const user = await getCurrentUser();
  if (!user) {
    redirect(ROUTES.MAIN);
  }
  const userId = user.uid;
  const history: RequestLog[] = await getUserRequestHistory(userId);

  if (history.length === 0) {
    return (
      <section className="m-full mx-auto mt-24 mb-auto px-8 pt-0 pb-8">
        <h3 className="mb-3 text-center text-[40px]">{t('empty_title')}</h3>
        <div className="flex justify-center gap-2">
          <p className="text-xl font-light">{t('empty_description')}</p>
          <Link className="text-xl font-light underline" href={ROUTES.REST}>
            {t('open_rest_client')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="m-full mx-auto mt-24 mb-auto px-8 pt-0 pb-8">
      <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          {t('title')}
        </h3>
        <ul className="flex flex-col gap-2">
          {history.map((doc) => (
            <HistoryItem doc={doc} key={doc.id} />
          ))}
        </ul>
        <p className="font-light text-gray-500">{t('description')}</p>
      </div>
    </section>
  );
}
