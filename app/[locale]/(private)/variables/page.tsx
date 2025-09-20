import { Spinner } from '@components';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { getCurrentUser } from '@/actions/auth-actions';

const Variable = dynamic(() =>
  import('@/components/variables-block/variables-block').then((mod) => mod.VariablesBlock),
);

export default async function Variables() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Variable user={user} />
    </Suspense>
  );
}
