import { render, screen } from '@testing-library/react';
import React from 'react';
import { Mock, vi } from 'vitest';

import HistoryList from './history-list';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/history', () => ({
  getUserRequestHistory: vi.fn(),
}));

vi.mock('@/constants', () => ({
  ROUTES: {
    REST: '/rest',
  },
}));

vi.mock('@components', () => ({
  HistoryItem: ({ doc }: { doc: { method: string; status: string; url: string } }) => (
    <div data-testid="history-item">
      {doc.method} {doc.url} - {doc.status}
    </div>
  ),
}));

import { getTranslations } from 'next-intl/server';

import { getUserRequestHistory } from '@/lib/history';

describe('HistoryList', () => {
  const mockUser = {
    displayName: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    token: 'test-token',
    uid: 'test-user-id',
  };

  const mockHistory = [
    {
      baseUrl: 'https://api.example.com',
      body: '{"name": "John"}',
      error: null,
      headers: { 'Content-Type': 'application/json' },
      id: '1',
      latency: 150,
      method: 'GET',
      requestSize: 1024,
      responseSize: 2048,
      status: 200,
      timestamp: '2024-01-15T10:30:00.000Z',
      url: 'https://api.example.com/users',
      userId: 'test-user-id',
    },
    {
      baseUrl: 'https://api.example.com',
      body: '{"title": "New Post"}',
      error: null,
      headers: { 'Content-Type': 'application/json' },
      id: '2',
      latency: 200,
      method: 'POST',
      requestSize: 512,
      responseSize: 1024,
      status: 201,
      timestamp: '2024-01-15T11:00:00.000Z',
      url: 'https://api.example.com/posts',
      userId: 'test-user-id',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when no history', async () => {
    (getUserRequestHistory as Mock).mockResolvedValue([]);
    (getTranslations as Mock).mockResolvedValue((key: string) => {
      const translations: Record<string, string> = {
        empty_description: 'Start making requests to see them here.',
        empty_title: 'No History Yet',
        open_rest_client: 'Open REST Client',
      };
      return translations[key] || key;
    });

    const component = await HistoryList({ user: mockUser });
    render(component);

    expect(screen.getByText('No History Yet')).toBeInTheDocument();
    expect(screen.getByText('Start making requests to see them here.')).toBeInTheDocument();
    expect(screen.getByText('Open REST Client')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/rest');
  });

  it('renders history list when history exists', async () => {
    (getUserRequestHistory as Mock).mockResolvedValue(mockHistory);
    (getTranslations as Mock).mockResolvedValue((key: string) => {
      const translations: Record<string, string> = {
        description: 'Your recent API requests',
        title: 'Request History',
      };
      return translations[key] || key;
    });

    const component = await HistoryList({ user: mockUser });
    render(component);

    expect(screen.getByText('Request History')).toBeInTheDocument();
    expect(screen.getByText('Your recent API requests')).toBeInTheDocument();

    const historyItems = screen.getAllByTestId('history-item');
    expect(historyItems).toHaveLength(2);
    expect(historyItems[0]).toHaveTextContent('GET https://api.example.com/users - 200');
    expect(historyItems[1]).toHaveTextContent('POST https://api.example.com/posts - 201');
  });

  it('calls getUserRequestHistory with correct user ID', async () => {
    (getUserRequestHistory as Mock).mockResolvedValue([]);
    (getTranslations as Mock).mockResolvedValue(() => 'test');

    await HistoryList({ user: mockUser });

    expect(getUserRequestHistory).toHaveBeenCalledWith('test-user-id');
  });

  it('renders correct structure with history items', async () => {
    (getUserRequestHistory as Mock).mockResolvedValue(mockHistory);
    (getTranslations as Mock).mockResolvedValue((key: string) => {
      const translations: Record<string, string> = {
        description: 'Your recent API requests',
        title: 'Request History',
      };
      return translations[key] || key;
    });

    const component = await HistoryList({ user: mockUser });
    render(component);

    const sections = screen.getAllByRole('generic');
    expect(sections.length).toBeGreaterThan(0);

    expect(screen.getByText('Request History')).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    expect(screen.getByText('Your recent API requests')).toBeInTheDocument();
  });

  it('handles single history item correctly', async () => {
    const singleHistory = [mockHistory[0]];
    (getUserRequestHistory as Mock).mockResolvedValue(singleHistory);
    (getTranslations as Mock).mockResolvedValue((key: string) => {
      const translations: Record<string, string> = {
        description: 'Your recent API requests',
        title: 'Request History',
      };
      return translations[key] || key;
    });

    const component = await HistoryList({ user: mockUser });
    render(component);

    const historyItems = screen.getAllByTestId('history-item');
    expect(historyItems).toHaveLength(1);
    expect(historyItems[0]).toHaveTextContent('GET https://api.example.com/users - 200');
  });

  it('applies correct CSS classes for styling', async () => {
    (getUserRequestHistory as Mock).mockResolvedValue(mockHistory);
    (getTranslations as Mock).mockResolvedValue((key: string) => {
      const translations: Record<string, string> = {
        description: 'Your recent API requests',
        title: 'Request History',
      };
      return translations[key] || key;
    });

    const component = await HistoryList({ user: mockUser });
    render(component);

    const mainSection = screen.getByText('Request History').closest('section');
    expect(mainSection).toHaveClass(
      'm-full',
      'mx-auto',
      'mt-10',
      'mb-auto',
      'flex',
      'flex-col',
      'gap-10',
      'px-8',
      'pt-0',
      'pb-8',
    );

    const titleSection = screen.getByText('Request History').closest('div');
    expect(titleSection).toHaveClass(
      'space-y-3',
      'rounded-2xl',
      'border',
      'border-neutral-200',
      'bg-fuchsia-50',
      'p-4',
      'shadow',
      'dark:bg-neutral-900',
    );

    const listSection = screen.getByRole('list').closest('div');
    expect(listSection).toHaveClass(
      'space-y-3',
      'rounded-2xl',
      'border',
      'border-neutral-200',
      'bg-fuchsia-50',
      'p-4',
      'shadow',
      'dark:bg-neutral-900',
    );
  });
});
