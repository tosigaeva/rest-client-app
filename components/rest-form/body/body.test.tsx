import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { Body } from './body';

vi.mock('@components', () => ({
  BodyEditor: () => <div data-testid="body-editor" />,
}));

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      'rest-client': {
        add: 'Add Header',
        body: 'Body',
        client: 'Client',
        headers: 'Headers',
        key: 'Key',
        'No-response': 'No response yet.',
        placeholder_url: 'Endpoint URL',
        'please-enter-valid-method-and-url': 'Please select HTTP method and enter url',
        send: 'Send Request',
        status: 'Status',
        value: 'Value',
      },
    };

    return (key: string) => translations[namespace]?.[key] ?? key;
  },
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
