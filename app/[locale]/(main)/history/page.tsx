import { HistoryList } from '@components';

import { Link } from '@/i18n/navigation';
import { getUserRequestHistory, RequestLog } from '@/lib/history';

export default async function History() {
  const userId = '9OmzuIZaXkZzXKQ4wNEEGNArECU2';
  const history: RequestLog[] = await getUserRequestHistory(userId);

  if (history.length === 0) {
    return (
      <section className="m-full mx-auto mt-24 mb-auto px-8 pt-0 pb-8">
        <h3 className="mb-3 text-center text-[40px]">You haven't executed any requests yet</h3>
        <div className="flex justify-center gap-2">
          <p className="text-xl font-light">It's empty here. Try those options:</p>
          {/* TODO: replace "/rest" with constant ROUTES.REST */}
          <Link className="text-xl font-light underline" href="/rest">
            Open REST Client
          </Link>
        </div>
      </section>
    );
  }

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
