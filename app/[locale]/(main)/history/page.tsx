import { Spinner } from '@components';
import { Suspense } from 'react';

import HistoryList from '@/components/history/list/history-list';

export default async function History() {
  return (
    <Suspense fallback={<Spinner />}>
      <HistoryList />
    </Suspense>
  );
}
