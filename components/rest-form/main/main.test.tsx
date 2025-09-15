import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { HTTP_METHODS } from '@/constants';
import { setMethod, setRequestUrl } from '@/store/rest-slice';
import { HttpMethod } from '@/type';

import { RestMain } from './main';

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/rest/GET',
}));

describe('RestMain', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
  });

  it('renders all HTTP methods in the select', () => {
    render(<RestMain />);

    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    HTTP_METHODS.forEach((method) => {
      const options = screen.getAllByText(method);
      expect(options.length).toBeGreaterThan(0);
    });
  });

  it('dispatches setMethod when a method is selected', () => {
    render(<RestMain />);

    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    const method = HTTP_METHODS[2] as HttpMethod;
    const option = screen.getByText(method);
    fireEvent.click(option);

    expect(mockDispatch).toHaveBeenCalledWith(setMethod(method));
  });

  it('updates input value and dispatches setRequestUrl on blur', () => {
    render(<RestMain />);
    const input = screen.getByPlaceholderText('Endpoint URL') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '/api/test' } });
    expect(input.value).toBe('/api/test');

    fireEvent.blur(input);
    expect(mockDispatch).toHaveBeenCalledWith(setRequestUrl('/api/test'));
  });
});
