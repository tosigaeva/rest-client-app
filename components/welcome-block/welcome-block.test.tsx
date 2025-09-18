import { render, screen } from '@testing-library/react';
import React from 'react';
import { Mock, vi } from 'vitest';

import { useAuth } from '@/context/auth-context';

import { WelcomeBlock } from './welcome-block';

vi.mock('@/context/auth-context', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => (key: string) => {
    return ns ? `${ns.toUpperCase()}.${key.toUpperCase()}` : key.toUpperCase();
  },
}));

vi.mock('@/i18n/navigation', () => ({
  Link: (props: React.PropsWithChildren<{ href: string }>) => (
    <a href={props.href}>{props.children}</a>
  ),
}));

describe('WelcomeBlock', () => {
  it('renders loading state', () => {
    (useAuth as Mock).mockReturnValue({ loading: true, user: null });

    render(<WelcomeBlock username="Alice" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders guest view when no user', () => {
    (useAuth as Mock).mockReturnValue({ loading: false, user: null });

    render(<WelcomeBlock username="Alice" />);

    expect(screen.getByRole('heading', { name: /WELCOMEBLOCK.WELCOME/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /SIGNIN/i })).toHaveAttribute('href', '/sign-in');
    expect(screen.getByRole('link', { name: /SIGNUP/i })).toHaveAttribute('href', '/sign-up');

    expect(screen.getByText(/WELCOMEBLOCK.TEXTUNDERBTN/i)).toBeInTheDocument();
  });

  it('renders user view when logged in', () => {
    (useAuth as Mock).mockReturnValue({ loading: false, user: { id: '1', name: 'Alice' } });

    render(<WelcomeBlock username="Alice" />);
    expect(
      screen.getByRole('heading', { name: /WELCOMEBLOCK.WELCOMEBACK, Alice!/i }),
    ).toBeInTheDocument();

    const navTitles = ['RESTCLIENT.TITLE', 'HISTORY.TITLE', 'VARIABLES.TITLE'];
    navTitles.forEach((title) => {
      expect(screen.getByRole('heading', { name: new RegExp(title, 'i') })).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /RESTCLIENT.BTN/i })).toHaveAttribute('href', '/rest');
    expect(screen.getByRole('link', { name: /HISTORY.BTN/i })).toHaveAttribute('href', '/history');
    expect(screen.getByRole('link', { name: /VARIABLES.BTN/i })).toHaveAttribute(
      'href',
      '/variables',
    );
  });
});
