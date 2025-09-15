import { ProtectedRoutes } from '@components';

export default function History() {
  return (
    <ProtectedRoutes>
      <div>History page</div>;
    </ProtectedRoutes>
  );
}
