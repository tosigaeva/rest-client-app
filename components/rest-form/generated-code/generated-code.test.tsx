import { fireEvent, render, screen } from '@testing-library/react';
import React, { ChangeEvent, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Mock } from 'vitest';

import { RootState } from '@/store/store';
import { ProgrammingLanguages } from '@/type';

import { GeneratedCode } from './generated-code';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('@/utils/generate-code', () => ({
  generateCode: vi.fn(() => 'GENERATED_CODE_SNIPPET'),
}));

vi.mock('@/utils/prepare-headers', () => ({
  prepareHeaders: vi.fn((headers: Record<string, string>) => headers),
}));

interface OptionProps {
  children: ReactNode;
  value: ProgrammingLanguages;
}

interface SelectProps {
  children: ReactNode;
  onValueChange: (value: ProgrammingLanguages) => void;
  value: string;
}

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, value }: SelectProps) => (
    <select
      data-testid="select"
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onValueChange(e.target.value as ProgrammingLanguages)
      }
      value={value}
    >
      {children}
    </select>
  ),
  SelectContent: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectItem: ({ children, value }: OptionProps) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectValue: ({ placeholder }: { placeholder: string }) => <option>{placeholder}</option>,
}));

describe('GeneratedCode', () => {
  const mockUseSelector = useSelector as unknown as Mock;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when method is missing', () => {
    mockUseSelector.mockImplementation((selector: (s: RootState) => unknown) =>
      selector({
        restData: { method: '', requestUrl: '' },
        restRequest: {},
      } as unknown as RootState),
    );

    render(<GeneratedCode />);
    expect(screen.queryByText(/select http method/i)).not.toBeInTheDocument();
  });

  it('renders nothing when requestUrl is missing', () => {
    mockUseSelector.mockImplementation((selector: (s: RootState) => unknown) =>
      selector({ restData: { method: 'GET', requestUrl: '' } } as RootState),
    );

    render(<GeneratedCode />);
    expect(screen.queryByText(/select http method/i)).not.toBeInTheDocument();
  });

  it('renders generated code when method and url are provided', () => {
    mockUseSelector.mockImplementation((selector: (s: RootState) => unknown) =>
      selector({
        restData: { body: 'data', headers: {}, method: 'POST', requestUrl: 'http://test.com' },
      } as RootState),
    );

    render(<GeneratedCode />);
    expect(screen.getByText(/generated code/i)).toBeInTheDocument();
    expect(screen.getByText('GENERATED_CODE_SNIPPET')).toBeInTheDocument();
  });

  it('changes language and client when a new programming language is selected', () => {
    mockUseSelector.mockImplementation((selector: (s: RootState) => unknown) =>
      selector({
        restData: { method: 'GET', requestUrl: 'http://test.com' },
      } as RootState),
    );

    render(<GeneratedCode />);
    const select = screen.getByTestId('select');

    fireEvent.change(select, {
      target: { value: 'JavaScript (Fetch api)' },
    });

    expect(screen.getByText('GENERATED_CODE_SNIPPET')).toBeInTheDocument();
  });
});
