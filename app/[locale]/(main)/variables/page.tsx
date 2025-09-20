import { Spinner } from '@components';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Variable = dynamic(() =>
  import('@/components/variables-block/variables-block').then((mod) => mod.VariablesBlock),
);

export default function Variables() {
  return (
    <Suspense fallback={<Spinner />}>
      <Variable />
    </Suspense>
  );
}
