import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders the spinner with loading text', () => {
    render(<Spinner />);

    const spinnerStatus = screen.getByRole('status', { name: /loading\.\.\./i });
    expect(spinnerStatus).toBeInTheDocument();

    const loadingText = screen.getByText(/loading\.\.\./i);
    expect(loadingText).toBeInTheDocument();
  });

  it('has correct CSS classes for animation and colors', () => {
    render(<Spinner />);
    const spinnerStatus = screen.getByRole('status', { name: /loading\.\.\./i });

    expect(spinnerStatus).toHaveClass(
      'animate-spin',
      'rounded-full',
      'border-4',
      'border-gray-200',
      'border-t-blue-500',
    );
  });
});
