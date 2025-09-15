import { render, screen } from '@testing-library/react';
import React from 'react';
import { Mock, vi } from 'vitest';

import { ROUTES } from '@/constants';
import { useAuth } from '@/context/auth-context';
import { usePathname } from '@/i18n/navigation';

import { ProtectedRoutes } from './protected-routes';

vi.mock('@/context/auth-context', () => ({
  useAuth: vi.fn(),
}));

const replaceMock = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: () => ({ replace: replaceMock }),
}));

describe('ProtectedRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when loading=true', () => {
    (useAuth as unknown as Mock).mockReturnValue({ loading: true, user: null });
    (usePathname as unknown as Mock).mockReturnValue(ROUTES.MAIN);

    render(
      <ProtectedRoutes>
        <div>Child</div>
      </ProtectedRoutes>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to MAIN if user is logged in and on noAuth route', () => {
    (useAuth as unknown as Mock).mockReturnValue({ loading: false, user: { id: '1' } });
    (usePathname as unknown as Mock).mockReturnValue(ROUTES.SIGN_IN);

    render(
      <ProtectedRoutes>
        <div>Child</div>
      </ProtectedRoutes>,
    );

    expect(replaceMock).toHaveBeenCalledWith(ROUTES.MAIN);
  });

  it('redirects to SIGN_IN if user is not logged in and on auth route', () => {
    (useAuth as unknown as Mock).mockReturnValue({ loading: false, user: null });
    (usePathname as unknown as Mock).mockReturnValue(ROUTES.REST);

    render(
      <ProtectedRoutes>
        <div>Child</div>
      </ProtectedRoutes>,
    );

    expect(replaceMock).toHaveBeenCalledWith(ROUTES.SIGN_IN);
  });

  it('renders children if conditions are met', () => {
    (useAuth as unknown as Mock).mockReturnValue({ loading: false, user: { id: '1' } });
    (usePathname as unknown as Mock).mockReturnValue(ROUTES.REST);

    render(
      <ProtectedRoutes>
        <div>Child</div>
      </ProtectedRoutes>,
    );

    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
