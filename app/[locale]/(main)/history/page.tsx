import { ProtectedRoutes } from '@/components/protected-routes';

export default function History() {
  return (
    <ProtectedRoutes>
      <div>History page</div>;
    </ProtectedRoutes>
  );
}
