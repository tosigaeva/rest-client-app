import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './app-sidebar';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const renderWithSidebarProvider = (ui: React.ReactNode) =>
  render(<SidebarProvider>{ui}</SidebarProvider>);

describe('AppSidebar', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        addEventListener: vi.fn(),
        addListener: vi.fn(),
        dispatchEvent: vi.fn(),
        matches: false,
        media: query,
        onchange: null,
        removeEventListener: vi.fn(),
        removeListener: vi.fn(),
      })),
      writable: true,
    });
  });

  it('renders sidebar with menu label', () => {
    renderWithSidebarProvider(<AppSidebar />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    renderWithSidebarProvider(<AppSidebar />);

    expect(screen.getByText('Rest-client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });

  it('links have correct href attributes', () => {
    renderWithSidebarProvider(<AppSidebar />);

    expect(screen.getByText('Rest-client').closest('a')).toHaveAttribute('href', '/rest');
    expect(screen.getByText('History').closest('a')).toHaveAttribute('href', '/history');
    expect(screen.getByText('Variables').closest('a')).toHaveAttribute('href', '/variables');
  });
});
