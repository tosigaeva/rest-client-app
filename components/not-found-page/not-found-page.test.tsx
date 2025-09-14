import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { NotFoundPage } from './not-found-page';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      btn: 'Go Back Home',
    };
    return translations[key] ?? key;
  },
}));

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('NotFoundPage', () => {
  it('renders the image with correct alt and src', () => {
    render(<NotFoundPage />);
    const img = screen.getByAltText('non-found') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/non-found.png');
  });

  it('renders a link with correct href and text', () => {
    render(<NotFoundPage />);
    const link = screen.getByRole('link', { name: /Go Back Home/i }) as HTMLAnchorElement;
    expect(link).toBeInTheDocument();
    expect(link.href).toContain('/en');
  });

  it('renders the icon inside the link', () => {
    render(<NotFoundPage />);
    const link = screen.getByRole('link', { name: /Go Back Home/i });
    expect(link.querySelector('svg')).toBeInTheDocument();
  });
});
