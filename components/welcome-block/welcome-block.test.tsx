import { render, screen } from '@testing-library/react';
import React from 'react';
import { Mock, vi } from 'vitest';

import { WelcomeBlock } from './welcome-block';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(),
}));

vi.mock('@/actions/auth-actions', () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/constants', () => ({
  ROUTES: {
    HISTORY: '/history',
    REST: '/rest',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    VARIABLES: '/variables',
  },
  STYLE_BUTTON:
    'px-4 py-2 text-gray-700 font-caprasimo bg-fuchsia-300 border border-gray-300 rounded-md hover:bg-fuchsia-400 transition-colors cursor-pointer',
}));

vi.mock('@/components/ui', () => ({
  Button: ({
    asChild,
    children,
    className,
    ...props
  }: React.ComponentProps<'button'> & {
    asChild?: boolean;
    children: React.ReactNode;
    className?: string;
  }) => {
    if (asChild) {
      return (
        <div className={className} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
          {children}
        </div>
      );
    }
    return (
      <button className={className} {...props}>
        {children}
      </button>
    );
  },
}));

import { getTranslations } from 'next-intl/server';

import { getCurrentUser } from '@/actions/auth-actions';

describe('WelcomeBlock', () => {
  const mockUser = {
    displayName: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    token: 'test-token',
    uid: 'test-user-id',
  };

  const mockTranslations: Record<
    string,
    string | { btn: string; description: string; title: string }
  > = {
    descriptionApp: 'Your REST API testing companion',
    history: {
      btn: 'View History',
      description: 'View your request history',
      title: 'History',
    },
    restClient: {
      btn: 'Open Client',
      description: 'Test your APIs with ease',
      title: 'REST Client',
    },
    textUnderBtn: 'Start exploring the world of APIs',
    variables: {
      btn: 'Manage Variables',
      description: 'Manage your variables',
      title: 'Variables',
    },
    welcome: 'Welcome to',
    welcomeBack: 'Welcome back',
  };

  const mockButtonTranslations: Record<string, string> = {
    signIn: 'Sign In',
    signUp: 'Sign Up',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      (getCurrentUser as Mock).mockResolvedValue(mockUser);
      (getTranslations as Mock).mockImplementation((namespace?: string) => {
        if (namespace === 'welcomeBlock') {
          return (key: string) => mockTranslations[key] || key;
        }
        return (key: string) => mockButtonTranslations[key] || key;
      });
    });

    it('renders welcome message with username', async () => {
      const component = await WelcomeBlock();
      render(component);

      expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
    });

    it('renders welcome message with email when displayName is not available', async () => {
      const userWithoutDisplayName = { ...mockUser, displayName: undefined };
      (getCurrentUser as Mock).mockResolvedValue(userWithoutDisplayName);

      const component = await WelcomeBlock();
      render(component);

      expect(screen.getByText('Welcome back, test@example.com!')).toBeInTheDocument();
    });

    it('renders welcome message with Guest when neither displayName nor email is available', async () => {
      const guestUser = { ...mockUser, displayName: undefined, email: undefined };
      (getCurrentUser as Mock).mockResolvedValue(guestUser);

      const component = await WelcomeBlock();
      render(component);

      expect(screen.getByText('Welcome back, Guest!')).toBeInTheDocument();
    });

    it('renders navigation cards for authenticated user', async () => {
      const component = await WelcomeBlock();
      render(component);

      expect(screen.getByText('restClient.title')).toBeInTheDocument();
      expect(screen.getByText('restClient.description')).toBeInTheDocument();
      expect(screen.getByText('restClient.btn')).toBeInTheDocument();

      expect(screen.getByText('history.title')).toBeInTheDocument();
      expect(screen.getByText('history.description')).toBeInTheDocument();
      expect(screen.getByText('history.btn')).toBeInTheDocument();

      expect(screen.getByText('variables.title')).toBeInTheDocument();
      expect(screen.getByText('variables.description')).toBeInTheDocument();
      expect(screen.getByText('variables.btn')).toBeInTheDocument();
    });

    it('renders correct links for navigation cards', async () => {
      const component = await WelcomeBlock();
      render(component);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute('href', '/rest');
      expect(links[1]).toHaveAttribute('href', '/history');
      expect(links[2]).toHaveAttribute('href', '/variables');
    });

    it('applies correct CSS classes for authenticated user layout', async () => {
      const component = await WelcomeBlock();
      render(component);

      const mainContainer = screen.getByText('Welcome back, Test User!').closest('div');
      expect(mainContainer).toHaveClass('flex', 'w-full', 'flex-col', 'gap-7', 'text-center');

      expect(screen.getByText('restClient.title')).toBeInTheDocument();
      expect(screen.getByText('history.title')).toBeInTheDocument();
      expect(screen.getByText('variables.title')).toBeInTheDocument();
    });
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      (getCurrentUser as Mock).mockResolvedValue(null);
      (getTranslations as Mock).mockImplementation((namespace?: string) => {
        if (namespace === 'welcomeBlock') {
          return (key: string) => mockTranslations[key] || key;
        }
        return (key: string) => mockButtonTranslations[key] || key;
      });
    });

    it('renders welcome message for guest user', async () => {
      const component = await WelcomeBlock();
      render(component);

      expect(screen.getByText('Welcome to RestCafé!')).toBeInTheDocument();
      expect(screen.getByText('Your REST API testing companion')).toBeInTheDocument();
    });

    it('renders sign in and sign up buttons', async () => {
      const component = await WelcomeBlock();
      render(component);

      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('renders correct links for authentication buttons', async () => {
      const component = await WelcomeBlock();
      render(component);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', '/sign-in');
      expect(links[1]).toHaveAttribute('href', '/sign-up');
    });

    it('renders text under buttons', async () => {
      const component = await WelcomeBlock();
      render(component);

      expect(screen.getByText('Start exploring the world of APIs')).toBeInTheDocument();
    });

    it('applies correct CSS classes for guest user layout', async () => {
      const component = await WelcomeBlock();
      render(component);

      const mainContainer = screen.getByText('Welcome to RestCafé!').closest('div');
      expect(mainContainer).toHaveClass(
        'flex',
        'w-3/4',
        'flex-col',
        'justify-center',
        'gap-8',
        'text-center',
      );

      const buttonsContainer = screen.getByText('Sign In').closest('div')?.parentElement;
      expect(buttonsContainer).toHaveClass('flex', 'justify-center', 'gap-4');
    });

    it('applies correct button styles', async () => {
      const component = await WelcomeBlock();
      render(component);

      const buttons = screen.getAllByText(/Sign (In|Up)/);
      buttons.forEach((button) => {
        expect(button.closest('div')).toHaveClass(
          'px-4',
          'py-2',
          'text-gray-700',
          'font-caprasimo',
          'bg-fuchsia-300',
        );
      });
    });
  });

  it('applies correct main container classes', async () => {
    (getCurrentUser as Mock).mockResolvedValue(mockUser);
    (getTranslations as Mock).mockImplementation((namespace?: string) => {
      if (namespace === 'welcomeBlock') {
        return (key: string) => mockTranslations[key] || key;
      }
      return (key: string) => mockButtonTranslations[key] || key;
    });

    const component = await WelcomeBlock();
    render(component);

    const mainContainer = screen
      .getByText('Welcome back, Test User!')
      .closest('div')?.parentElement;
    expect(mainContainer).toHaveClass(
      'flex',
      'w-full',
      'flex-col',
      'items-center',
      'justify-center',
      'rounded-2xl',
      'border',
      'border-neutral-200',
      'bg-fuchsia-50',
      'p-4',
      'shadow',
      'dark:bg-neutral-900',
    );
  });

  it('calls getCurrentUser on component initialization', async () => {
    (getCurrentUser as Mock).mockResolvedValue(mockUser);
    (getTranslations as Mock).mockImplementation((namespace?: string) => {
      if (namespace === 'welcomeBlock') {
        return (key: string) => mockTranslations[key] || key;
      }
      return (key: string) => mockButtonTranslations[key] || key;
    });

    await WelcomeBlock();

    expect(getCurrentUser).toHaveBeenCalledTimes(1);
  });

  it('calls getTranslations with correct parameters', async () => {
    (getCurrentUser as Mock).mockResolvedValue(mockUser);
    (getTranslations as Mock).mockImplementation((namespace?: string) => {
      if (namespace === 'welcomeBlock') {
        return (key: string) => mockTranslations[key] || key;
      }
      return (key: string) => mockButtonTranslations[key] || key;
    });

    await WelcomeBlock();

    expect(getTranslations).toHaveBeenCalledWith();
    expect(getTranslations).toHaveBeenCalledWith('welcomeBlock');
  });
});
