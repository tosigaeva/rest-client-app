import { ProtectedRoutes } from '@components';

import { VariablesBlock } from '@/components/variables-block';

export default function Variables() {
  return (
    <ProtectedRoutes>
      <VariablesBlock />;
    </ProtectedRoutes>
  );
}
