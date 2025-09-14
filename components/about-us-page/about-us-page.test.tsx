import { render, screen } from '@testing-library/react';
// AboutUsPage.test.tsx
import React from 'react';
import { vi } from 'vitest';

import { DEVELOPERS, ICON } from '@/constants';

import { AboutUsPage } from './about-us-page';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return key.toUpperCase();
  },
}));

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe('AboutUsPage', () => {
  it('renders the team heading', () => {
    render(<AboutUsPage />);
    const heading = screen.getByRole('heading', { name: /TEAM/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all developers with name, role, description, and image', () => {
    render(<AboutUsPage />);

    DEVELOPERS.forEach((dev) => {
      const name = screen.getByText(`${dev.name}.NAME`.toUpperCase());
      expect(name).toBeInTheDocument();

      const descr = screen.getByText(`${dev.name}.DESCR`.toUpperCase());
      expect(descr).toBeInTheDocument();

      const img = screen.getByAltText(`${dev.name}.NAME`.toUpperCase()) as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain(ICON);

      const githubLink = screen.getByRole('link', { name: `GitHub_${dev.name}` });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', dev.git);
    });
  });

  it('renders GitHub icons for each developer', () => {
    render(<AboutUsPage />);
    const githubIcons = screen.getAllByTestId('github-icon');
    expect(githubIcons.length).toBe(DEVELOPERS.length);
  });
});
