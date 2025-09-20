import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import restReducer from '@/store/rest-slice';
import { Header } from '@/type';

import { RestHeaders } from './headers';

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

vi.mock('@/context/auth-context', () => ({
  useAuth: () => ({ user: null }),
}));
vi.mock('@/components/ui/input', () => ({
  Input: ({
    onChange,
    placeholder,
    value,
  }: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value: string;
  }) => (
    <input data-testid={placeholder} onChange={onChange} placeholder={placeholder} value={value} />
  ),
}));

vi.mock('@components', () => ({
  HeaderItem: ({ header, onDelete }: { header: Header; onDelete: (header: Header) => void }) => (
    <div>
      <span>{header.headerKey}</span>:<span>{header.value}</span>
      <button onClick={() => onDelete(header)}>x</button>
    </div>
  ),
}));

describe('RestHeaders', () => {
  const setupStore = (preloadedState?: object) =>
    configureStore({
      preloadedState,
      reducer: { restData: restReducer },
    });

  it('renders title and inputs', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <RestHeaders />
      </Provider>,
    );

    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByTestId('Key')).toBeInTheDocument();
    expect(screen.getByTestId('Value')).toBeInTheDocument();
  });

  it('adds header when inputs are filled and button clicked', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <RestHeaders />
      </Provider>,
    );

    fireEvent.change(screen.getByTestId('Key'), {
      target: { value: 'Content-Type' },
    });
    fireEvent.change(screen.getByTestId('Value'), {
      target: { value: 'application/json' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add header/i }));

    expect(screen.getByText('Content-Type')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
  });

  it('removes header when delete is clicked', () => {
    const preloaded = {
      restData: {
        body: '',
        headers: [{ headerKey: 'Authorization', value: 'Bearer token' }],
        method: 'GET',
        requestUrl: 'https://api.test.com',
      },
    };

    const store = setupStore(preloaded);
    render(
      <Provider store={store}>
        <RestHeaders />
      </Provider>,
    );

    expect(screen.getByText('Authorization')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'x' }));
    expect(screen.queryByText('Authorization')).not.toBeInTheDocument();
  });
});
