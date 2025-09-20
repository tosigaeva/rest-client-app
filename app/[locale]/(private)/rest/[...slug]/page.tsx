import { RestResponse } from '@components';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/actions/auth-actions';
import { ROUTES } from '@/constants';

export default async function RestClientPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.MAIN);
  }

  return <RestResponse user={user} />;
}
