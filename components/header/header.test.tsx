import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import toast from 'react-hot-toast';
import { Mock, vi } from 'vitest';

import { useAuth } from '@/context/auth-context';
import { useRouter } from '@/i18n/navigation';

import { Header } from './header';

vi.mock('@/context/auth-context', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: (props: React.PropsWithChildren<{ href: string }>) => (
    <a href={props.href}>{props.children}</a>
  ),
  useRouter: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => (key: string) => `${ns?.toUpperCase()}.${key.toUpperCase()}`,
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

vi.mock('@components', () => ({
  LanguageSelect: () => <div data-testid="language-select">Lang</div>,
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { error: vi.fn(), success: vi.fn() },
  error: vi.fn(),
  success: vi.fn(),
}));

describe('Header', () => {
  let signOutMock: ReturnType<typeof vi.fn>;
  let pushMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    signOutMock = vi.fn();
    pushMock = vi.fn();
    (useAuth as Mock).mockReturnValue({ signOut: signOutMock, user: null });
    (useRouter as Mock).mockReturnValue({ push: pushMock });
    vi.clearAllMocks();
  });

  it('renders logo and static elements', () => {
    render(<Header />);
    expect(screen.getByAltText(/logo-app/i)).toBeInTheDocument();
    expect(screen.getByText(/RestCafé/i)).toBeInTheDocument();
    expect(screen.getByTestId('language-select')).toBeInTheDocument();
    expect(screen.getByRole('link', { hidden: true, name: '' })).toHaveAttribute(
      'href',
      '/about-us',
    );
  });

  it('renders Sign In / Sign Up when user is not logged in', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /AUTH.SIGNIN/i })).toHaveAttribute('href', '/sign-in');
    expect(screen.getByRole('link', { name: /AUTH.SINGUP/i })).toHaveAttribute('href', '/sign-up');
  });

  it('renders logout button when user is logged in', () => {
    (useAuth as Mock).mockReturnValue({ signOut: signOutMock, user: { id: '1' } });
    render(<Header />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls signOut and shows success toast on logout success', async () => {
    (useAuth as Mock).mockReturnValue({ signOut: signOutMock, user: { id: '1' } });
    signOutMock.mockResolvedValue(undefined);

    render(<Header />);
    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(signOutMock).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('AUTH.TOASTS.SIGNOUT_SUCCESS');
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('calls signOut and shows error toast on logout failure', async () => {
    (useAuth as Mock).mockReturnValue({ signOut: signOutMock, user: { id: '1' } });
    signOutMock.mockRejectedValue(new Error('fail'));

    render(<Header />);
    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(signOutMock).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('AUTH.TOASTS.SIGNOUT_ERROR');
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('applies sticky styles after scroll', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header.className).toMatch(/h-16/);

    act(() => {
      window.scrollY = 50;
      fireEvent.scroll(window);
    });

    expect(header.className).toMatch(/h-12/);
    expect(header.className).toMatch(/bg-orange-300/);
  });
});
