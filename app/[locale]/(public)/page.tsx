import { AboutUsPage, WelcomeBlock } from '@components';
import { Suspense } from 'react';

export default function Page() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-4">
      <Suspense>
        <WelcomeBlock />
        <AboutUsPage />
      </Suspense>
    </section>
  );
}
