import { fireEvent, render, screen } from '@testing-library/react';
import * as navigation from 'next/navigation';
import * as redux from 'react-redux';
import { vi } from 'vitest';

import { HttpMethod } from '@/type';

import { SendButton } from './send-button';

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof redux>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (
      selector: (arg: {
        restData: {
          body: string;
          headers: [];
          method: HttpMethod;
          requestUrl: string;
        };
      }) => void,
    ) =>
      selector({
        restData: {
          body: '{"test":1}',
          headers: [],
          method: 'GET',
          requestUrl: 'https://example.com',
        },
      }),
  };
});

const mockPush = vi.fn();
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual<typeof navigation>('next/navigation');
  return {
    ...actual,
    useRouter: () => ({ push: mockPush }) as const,
  };
});

describe('SendButton', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockPush.mockClear();
  });

  it('renders button enabled when method and url are set', () => {
    render(<SendButton locale="en" />);
    const button = screen.getByRole('button', { name: /send request/i });
    expect(button).toBeEnabled();
  });

  it('calls dispatch and router.push on click', () => {
    render(<SendButton locale="en" />);
    const button = screen.getByRole('button', { name: /send request/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalled();
  });
});
