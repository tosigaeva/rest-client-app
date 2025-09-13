import { HistoryList } from '@components';

import { getUserRequestHistory, RequestLog } from '@/lib/history';

export default async function History() {
  const userId = 'H9MmBQpFF1N8Vc5HXw46oSzQVbg1';
  const history: RequestLog[] = await getUserRequestHistory(userId);

  return (
    <section className="m-full mx-auto mt-24 mb-auto px-8 pt-0 pb-8">
      <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow dark:bg-neutral-900">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          History Requests
        </h3>
        <HistoryList history={history} />
        <p className="font-light text-gray-500">
          Click on a request to restore it in the REST Client.
        </p>
      </div>
    </section>
  );
}
