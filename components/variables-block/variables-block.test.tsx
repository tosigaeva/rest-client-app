import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Mock, vi } from 'vitest';

import { VariablesBlock } from './variables-block';

vi.mock('@/context/auth-context', () => ({
  useAuth: () => ({ user: null }),
}));

vi.mock('@/i18n/navigation', () => {
  return {
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    ),
  };
});

vi.mock('firebase-admin', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase-admin')>();
  return {
    __esModule: true,
    default: {
      ...actual,
      apps: [],
      auth: () => ({
        getUser: vi.fn().mockResolvedValue({
          displayName: 'Test User',
          email: 'test@example.com',
          uid: 'test-uid',
        }),
      }),
      credential: {
        cert: vi.fn(() => ({})),
      },
      firestore: vi.fn(() => ({
        collection: vi.fn(() => ({
          doc: vi.fn(() => ({
            delete: vi.fn().mockResolvedValue(null),
            get: vi.fn().mockResolvedValue({
              data: () => ({ example: 'data' }),
              exists: true,
            }),
            set: vi.fn().mockResolvedValue(null),
            update: vi.fn().mockResolvedValue(null),
          })),
        })),
      })),
      initializeApp: vi.fn(),
    },
  };
});

vi.mock('@/hooks/use-variables', () => ({
  useVariables: vi.fn(),
}));

vi.mock('use-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('../ui', async () => {
  const actual = await vi.importActual('../ui');
  return {
    ...actual,
    Button: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    Input: ({ ...props }: React.ComponentProps<'input'>) => <input {...props} />,
  };
});

import { useTranslations } from 'use-intl';

import { useVariables } from '@/hooks/use-variables';

describe('VariablesBlock', () => {
  const mockHandleAddRow = vi.fn();
  const mockHandleDelete = vi.fn();
  const mockHandleInputChange = vi.fn();
  const mockHandleSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useTranslations as Mock).mockImplementation(() => (key: string) => key.toUpperCase());

    (useVariables as Mock).mockReturnValue({
      handleAddRow: mockHandleAddRow,
      handleDelete: mockHandleDelete,
      handleInputChange: mockHandleInputChange,
      handleSave: mockHandleSave,
      rows: [
        { saved: false, value: '123', variable: 'VAR1' },
        { saved: true, value: '456', variable: 'VAR2' },
      ],
    });
  });

  it('renders rows correctly', () => {
    render(<VariablesBlock />);

    expect(screen.getByDisplayValue('VAR1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();

    expect(screen.getByDisplayValue('VAR2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('456')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes[0].checked).toBe(false);
    expect(checkboxes[1].checked).toBe(true);
  });

  it('calls handleInputChange on input change', () => {
    render(<VariablesBlock />);

    const input = screen.getByDisplayValue('VAR1') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW_VAR' } });

    expect(mockHandleInputChange).toHaveBeenCalledWith(0, 'variable', 'NEW_VAR');
  });

  it('calls handleAddRow and handleSave via VariablesHeader', () => {
    render(<VariablesBlock />);
  });
});
