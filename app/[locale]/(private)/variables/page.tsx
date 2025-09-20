import { Spinner } from '@components';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getCurrentUser } from '@/actions/auth-actions';
import { ROUTES } from '@/constants';

const Variable = dynamic(() =>
  import('@/components/variables-block/variables-block').then((mod) => mod.VariablesBlock),
);

export default async function Variables() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.MAIN);
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Variable user={user} />
    </Suspense>
  );
}
