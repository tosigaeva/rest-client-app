import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AboutCourse } from './about-course';

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => (key: string) =>
    ns ? `${ns.toUpperCase()}.${key.toUpperCase()}` : key.toUpperCase(),
}));

describe('AboutCourse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders course title', () => {
    render(<AboutCourse />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('ABOUTCOURSE.REACT');
  });

  it('renders course description', () => {
    render(<AboutCourse />);
    const description = screen.getByRole('heading', { level: 3 });
    expect(description).toHaveTextContent('ABOUTCOURSE.DESCRIPTION');
  });

  it('renders both headings in the document', () => {
    render(<AboutCourse />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
