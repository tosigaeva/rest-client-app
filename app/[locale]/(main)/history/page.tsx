import { Suspense } from 'react';

import { getCurrentUser } from '@/actions/auth-actions';
import { HistoryList } from '@/components/history/list/history-list';
import { Spinner } from '@/components/spinner';

export default async function History() {
  const user = await getCurrentUser();
  const userId = user?.uid;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">History</h2>
      <p>Welcome, {user?.displayName || user?.email || 'User'}!</p>
      <Suspense fallback={<Spinner />}>{userId && <HistoryList userId={userId} />}</Suspense>
    </div>
  );
}
