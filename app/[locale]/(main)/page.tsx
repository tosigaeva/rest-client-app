'use client';
import { AboutUsPage, WelcomeBlock } from '@components';

import { useAuth } from '@/context/auth-context';

export default function Page() {
  const { user } = useAuth();

  const username = user?.displayName || user?.email || 'Guest';

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-4">
      <WelcomeBlock username={username} />
      <AboutUsPage />
    </section>
  );
}
