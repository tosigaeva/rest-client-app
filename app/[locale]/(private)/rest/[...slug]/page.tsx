import { RestResponse } from '@components';

import { getCurrentUser } from '@/actions/auth-actions';

export default async function RestClientPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return <RestResponse user={user} />;
}
