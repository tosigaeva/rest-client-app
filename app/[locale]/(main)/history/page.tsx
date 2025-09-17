import { Suspense } from 'react';

import HistoryList from '@/components/history/list/history-list';
import { Spinner } from '@/components/spinner';

export default async function History() {
  return (
    <Suspense fallback={<Spinner />}>
      <HistoryList />
    </Suspense>
  );
}
