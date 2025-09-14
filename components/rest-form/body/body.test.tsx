import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { Body } from './body';

vi.mock('@components', () => ({
  BodyEditor: () => <div data-testid="body-editor" />,
}));

describe('Body', () => {
  it('renders heading', () => {
    render(<Body />);
    const heading = screen.getByRole('heading', { name: 'Body' });
    expect(heading).toBeInTheDocument();
  });

  it('renders BodyEditor', () => {
    render(<Body />);
    const editor = screen.getByTestId('body-editor');
    expect(editor).toBeInTheDocument();
  });
});
