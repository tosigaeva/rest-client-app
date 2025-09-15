import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { PasswordChecklist } from './password-checklist';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      lowercase: 'Lowercase letter',
      min_length: 'Minimum 8 characters',
      number: 'Number',
      special_char: 'Special character',
      uppercase: 'Uppercase letter',
    };
    return translations[key] ?? key;
  },
}));

vi.mock('@/lib/password-utils', () => ({
  hasLowercase: (pw: string) => /[a-z]/.test(pw),
  hasMinLength: (pw: string) => pw.length >= 8,
  hasNumber: (pw: string) => /\d/.test(pw),
  hasSpecialChar: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  hasUppercase: (pw: string) => /[A-Z]/.test(pw),
}));

describe('PasswordChecklist', () => {
  it('renders all password checks', () => {
    render(<PasswordChecklist password="" />);
    expect(screen.getByText('Uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('Lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('Special character')).toBeInTheDocument();
    expect(screen.getByText('Minimum 8 characters')).toBeInTheDocument();
    expect(screen.getByText('Number')).toBeInTheDocument();
  });

  it('shows MdFiberManualRecord icons for invalid password', () => {
    render(<PasswordChecklist password="" />);

    const icons = screen.getAllByTestId('icon-pending');
    expect(icons).toHaveLength(5);

    icons.forEach((icon) => {
      expect(icon.querySelector('circle')).toBeTruthy();
    });
  });

  it('shows MdDone icons for passed checks', () => {
    render(<PasswordChecklist password="Abc1!def" />);
    const icons = screen.getAllByTestId('icon-done');
    expect(icons).toHaveLength(5);
  });

  it('renders correct colors', () => {
    const { container } = render(<PasswordChecklist password="Abc" />);
    const divs = container.querySelectorAll('div.flex.w-1\\/2.items-center.gap-2.pt-0\\.5.text-sm');

    divs.forEach((div) => {
      const text = div.textContent;
      if (text?.includes('Uppercase letter') || text?.includes('Lowercase letter')) {
        expect(div).toHaveStyle({ color: 'rgb(156, 163, 175)' });
      } else {
        expect(div).toHaveStyle({ color: 'rgb(0, 0, 0)' });
      }
    });
  });
});
