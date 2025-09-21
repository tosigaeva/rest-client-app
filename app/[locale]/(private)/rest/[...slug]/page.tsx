import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/actions/auth-actions';
import { ROUTES } from '@/constants';

const RestResponse = dynamic(() =>
  import('@/components/rest-form/response/response').then((mod) => mod.RestResponse),
);

export default async function RestClientPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.MAIN);
  }

  return <RestResponse user={user} />;
}
