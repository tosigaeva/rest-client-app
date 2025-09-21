import { AboutCourse, AboutUsPage, WelcomeBlock } from '@components';
import { Suspense } from 'react';

export default function Page() {
  return (
    <section className="mt-5 flex min-h-screen flex-col items-center justify-around gap-2.5 p-7">
      <Suspense>
        <WelcomeBlock />
        <AboutUsPage />
        <AboutCourse />
      </Suspense>
    </section>
  );
}
