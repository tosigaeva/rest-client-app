import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { RestResponse } from './response';

const mockUseSelector = vi.fn();

vi.mock('react-redux', () => ({
  useSelector: (callback: (state: unknown) => unknown) => mockUseSelector(callback),
}));

vi.mock('@components', () => ({
  BodyEditor: ({ initialBody }: { initialBody: string }) => (
    <div data-testid="body-editor">{initialBody}</div>
  ),
  Spinner: () => <div>Loading...</div>,
}));

describe('RestResponse', () => {
  beforeEach(() => {
    mockUseSelector.mockReset();
  });

  it('renders loading state', () => {
    mockUseSelector.mockReturnValue({ loading: true, response: null });
    render(<RestResponse />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "No response yet" when there is no response', () => {
    mockUseSelector.mockReturnValue({ loading: false, response: null });
    render(<RestResponse />);
    expect(screen.getByText('No response yet.')).toBeInTheDocument();
  });

  it('renders status and body when response is available', () => {
    const response = { data: '{"foo":"bar"}', status: 200 };
    mockUseSelector.mockReturnValue({ loading: false, response });

    render(<RestResponse />);

    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();

    const bodyEditor = screen.getByTestId('body-editor');
    expect(bodyEditor).toHaveTextContent(response.data);
  });

  it('applies correct color classes for status codes', () => {
    const statuses = [
      { code: 200, expectedClass: 'text-green-600' },
      { code: 302, expectedClass: 'text-blue-600' },
      { code: 404, expectedClass: 'text-red-600' },
      { code: 100, expectedClass: 'text-gray-500' },
    ];

    statuses.forEach(({ code, expectedClass }) => {
      mockUseSelector.mockReturnValue({ loading: false, response: { data: '{}', status: code } });
      render(<RestResponse />);
      const statusEl = screen.getByText(code.toString());
      expect(statusEl).toHaveClass(expectedClass);
    });
  });
});
