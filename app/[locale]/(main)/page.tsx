'use client';
import { WelcomeBlock } from '@components';
import { useAuth } from '@/context/auth-context';

export default function Page() {
  const { user } = useAuth();

  const username = user?.displayName || user?.email || 'Guest';

  return <WelcomeBlock username={username} />;
}
