import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getCurrentUser } from '@/actions/auth-actions';
import { ROUTES } from '@/constants';

export default async function RestClientLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.MAIN);
  }

  const RestMain = dynamic(() =>
    import('@/components/rest-form/main/main').then((mod) => mod.RestMain),
  );
  const RestHeaders = dynamic(() =>
    import('@/components/rest-form/headers/headers').then((mod) => mod.RestHeaders),
  );
  const Body = dynamic(() => import('@/components/rest-form/body/body').then((mod) => mod.Body));
  const GeneratedCode = dynamic(() =>
    import('@/components/rest-form/generated-code/generated-code').then((mod) => mod.GeneratedCode),
  );
  const SendButton = dynamic(() =>
    import('@/components/rest-form/send-button/send-button').then((mod) => mod.SendButton),
  );

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">REST Client</h2>
      <RestMain user={user} />
      <RestHeaders user={user} />
      <Body user={user} />
      <GeneratedCode user={user} />
      <SendButton />
      {children}
    </div>
  );
}
