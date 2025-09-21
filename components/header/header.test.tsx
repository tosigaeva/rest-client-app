import { fireEvent, render, screen } from '@testing-library/react';
import toast from 'react-hot-toast';
import { Mock, vi } from 'vitest';

import { ROUTES } from '@/constants';
import { signOut } from '@/context/auth-context';
import { useRouter } from '@/i18n/navigation';
import { ServerUser } from '@/type';

import { Header } from './header';

const mockUser: ServerUser = {
  displayName: 'Alice',
  email: 'alice@example.com',
  emailVerified: true,
  uid: 'user-1',
};

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => (key: string) => `${ns?.toUpperCase()}.${key.toUpperCase()}`,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  useRouter: vi.fn(),
}));

vi.mock('@/context/auth-context', () => ({
  signOut: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
  error: vi.fn(),
  success: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock('@components', () => ({
  LanguageSelect: () => <div>LanguageSelect</div>,
}));

vi.mock('@/lib/utils', () => ({
  cn: (...classes: (Record<string, boolean> | string)[]) =>
    classes
      .map((c) =>
        typeof c === 'string'
          ? c
          : Object.entries(c)
              .filter(([, v]) => v)
              .map(([k]) => k)
              .join(' '),
      )
      .join(' '),
}));

describe('Header', () => {
  const push = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push });
  });

  it('renders logo and app title', () => {
    render(<Header user={null} />);
    expect(screen.getByAltText('logo-app')).toBeInTheDocument();
    expect(screen.getByText('RestCafé')).toBeInTheDocument();
  });

  it('renders LanguageSelect component', () => {
    render(<Header user={null} />);
    expect(screen.getByText('LanguageSelect')).toBeInTheDocument();
  });

  it('renders Sign In and Sign Up buttons when user is null', () => {
    render(<Header user={null} />);
    expect(screen.getByText('AUTH.SIGNIN')).toBeInTheDocument();
    expect(screen.getByText('AUTH.SINGUP')).toBeInTheDocument();
  });

  it('renders logout button when user is present', () => {
    render(<Header user={mockUser} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls signOut and navigates on logout', async () => {
    (signOut as Mock).mockResolvedValue(undefined);
    render(<Header user={mockUser} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 0));

    expect(signOut).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('AUTH.TOASTS.SIGNOUT_SUCCESS');
    expect(push).toHaveBeenCalledWith(ROUTES.MAIN);
  });

  it('shows error toast if signOut fails', async () => {
    (signOut as Mock).mockRejectedValue(new Error('fail'));
    render(<Header user={mockUser} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 0));

    expect(toast.error).toHaveBeenCalledWith('AUTH.TOASTS.SIGNOUT_ERROR');
  });

  it('updates sticky state on scroll', () => {
    render(<Header user={null} />);
    expect(document.querySelector('header')?.className).toContain('bg-transparent');

    Object.defineProperty(window, 'scrollY', { value: 20, writable: true });
    fireEvent.scroll(window);

    expect(document.querySelector('header')?.className).toContain('bg-orange-300');
  });
});
