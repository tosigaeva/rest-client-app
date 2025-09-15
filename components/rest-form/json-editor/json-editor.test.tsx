import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import restReducer from '@/store/rest-slice';

import { BodyEditor } from './json-editor';

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock('next/navigation', () => ({
  usePathname: () => '/rest/GET',
}));

vi.mock('@uiw/react-codemirror', () => ({
  default: ({ onChange, value }: { onChange: (v: string) => void; value: string }) => (
    <textarea data-testid="codemirror" onChange={(e) => onChange(e.target.value)} value={value} />
  ),
}));

describe('BodyEditor', () => {
  const setupStore = () =>
    configureStore({
      reducer: { restData: restReducer },
    });

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders textarea', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <BodyEditor />
      </Provider>,
    );

    const editor = screen.getByTestId('codemirror');
    expect(editor).toBeInTheDocument();
    expect(editor).toHaveValue('');
  });

  it('formats valid JSON in readOnly mode', () => {
    const store = setupStore();
    const jsonStr = '{"key":"value"}';

    render(
      <Provider store={store}>
        <BodyEditor initialBody={jsonStr} readOnly />
      </Provider>,
    );

    const editor = screen.getByTestId('codemirror') as HTMLTextAreaElement;
    expect(editor.value).toBe(JSON.stringify(JSON.parse(jsonStr), null, 2));
  });

  it('does not format invalid JSON in readOnly mode', () => {
    const store = setupStore();
    const invalidJson = '{"key":}';

    render(
      <Provider store={store}>
        <BodyEditor initialBody={invalidJson} readOnly />
      </Provider>,
    );

    const editor = screen.getByTestId('codemirror') as HTMLTextAreaElement;
    expect(editor.value).toBe('');
  });

  it('shows error message for invalid JSON', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <BodyEditor />
      </Provider>,
    );

    const editor = screen.getByTestId('codemirror') as HTMLTextAreaElement;
    fireEvent.change(editor, { target: { value: '{"key":}' } });
    fireEvent.blur(editor);

    expect(screen.getByText(/Invalid JSON; prettify skipped/i)).toBeInTheDocument();
  });
});
