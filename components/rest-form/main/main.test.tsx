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

describe('RestMain', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
  });

  it('renders all HTTP methods in the select', () => {
    render(<RestMain />);

    const selectTrigger = screen.getByText('Method');
    fireEvent.click(selectTrigger);

    HTTP_METHODS.forEach((method) => {
      expect(screen.getByText(method)).toBeInTheDocument();
    });
  });

  it('dispatches setMethod when a method is selected', () => {
    render(<RestMain />);

    const selectTrigger = screen.getByText('Method');
    fireEvent.click(selectTrigger);

    const method = HTTP_METHODS[0] as HttpMethod;
    const option = screen.getByText(method);
    fireEvent.click(option);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setMethod(method));
  });

  it('updates input value and dispatches setRequestUrl on blur', () => {
    render(<RestMain />);
    const input = screen.getByPlaceholderText('Endpoint URL') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '/api/test' } });
    expect(input.value).toBe('/api/test');

    fireEvent.blur(input);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setRequestUrl('/api/test'));
  });
});
