import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { routing } from '@/i18n/routing';

import { LanguageSelect } from './language-select';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key.toUpperCase(),
}));

const pushMock = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => 'test-path',
  useRouter: () => ({ push: pushMock }),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('param=1'),
}));

routing.locales = ['en', 'ru', 'be'];

describe('LanguageSelect', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('renders button with current locale', () => {
    render(<LanguageSelect />);
    const button = screen.getByRole('button', { name: /EN/i });
    expect(button).toBeInTheDocument();
  });
});
