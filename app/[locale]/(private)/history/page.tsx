import { Spinner } from '@components';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getCurrentUser } from '@/actions/auth-actions';
import { ROUTES } from '@/constants';

const HistoryList = dynamic(() =>
  import('@/components/history/list/history-list').then((mod) => mod.default),
);

export default async function History() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(ROUTES.MAIN);
  }

  return (
    <Suspense fallback={<Spinner />}>
      <HistoryList user={user} />
    </Suspense>
  );
}
