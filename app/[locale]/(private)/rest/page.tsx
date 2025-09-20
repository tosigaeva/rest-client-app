import { Body, GeneratedCode, RestHeaders, RestMain, SendButton } from '@components';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/actions/auth-actions';
import { ROUTES } from '@/constants';

export default async function RestClientPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.MAIN);
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">REST Client</h2>
      <RestMain user={user} />
      <RestHeaders user={user} />
      <Body user={user} />
      <GeneratedCode user={user} />
      <SendButton user={user} />
    </div>
  );
}
