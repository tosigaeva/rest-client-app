import { Spinner } from '@components';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HistoryList = dynamic(() =>
  import('@/components/history/list/history-list').then((mod) => mod.default),
);

export default async function History() {
  return (
    <Suspense fallback={<Spinner />}>
      <HistoryList />
    </Suspense>
  );
}
