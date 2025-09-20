import { HistoryList, Spinner } from '@components';
import { Suspense } from 'react';

export default async function History() {
  return (
    <Suspense fallback={<Spinner />}>
      <HistoryList />
    </Suspense>
  );
}
