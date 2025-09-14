import { ProtectedRoutes } from '@/components/protected-routes';
import { VariablesBlock } from '@/components/variables-block';

export default function Variables() {
  return (
    <ProtectedRoutes>
      <VariablesBlock />;
    </ProtectedRoutes>
  );
}
