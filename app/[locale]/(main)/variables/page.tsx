import { ProtectedRoutes } from '@/components/protected-routes';

export default function Variables() {
  return (
    <ProtectedRoutes>
      <div>Variables</div>;
    </ProtectedRoutes>
  );
}
