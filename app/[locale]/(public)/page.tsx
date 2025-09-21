import { AboutCourse, AboutUsPage, WelcomeBlock } from '@components';
import { Suspense } from 'react';

export default function Page() {
  return (
    <section className="mt-10 flex min-h-screen flex-col items-center justify-around p-4">
      <Suspense>
        <WelcomeBlock />
        <AboutUsPage />
        <AboutCourse />
      </Suspense>
    </section>
  );
}
