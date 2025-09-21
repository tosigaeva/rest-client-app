import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { DEVELOPERS, RSS_LINK } from '@/constants';

import { Footer } from './footer';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      client: ' Client',
      logo: 'RSS Logo',
      ...DEVELOPERS.reduce((acc, author) => ({ ...acc, [author.name]: author.name }), {}),
    };
    return translations[key] ?? key;
  },
}));

describe('Footer', () => {
  it('renders GitHub links for all authors', () => {
    render(<Footer />);

    DEVELOPERS.forEach((author) => {
      const link = screen.getByRole('link', { name: author.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', author.git);
    });
  });

  it("renders copyright with year and translated 'client'", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 REST Client/)).toBeInTheDocument();
  });

  it('renders RSS link with logo image', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'RSS Logo' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', RSS_LINK);

    const img = screen.getByAltText('RSS Logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/rss-logo.svg');
  });
});
