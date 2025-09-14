import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { Header } from '@/type';

import { HeaderItem } from './header-item';

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('HeaderItem', () => {
  const header: Header = { headerKey: 'Authorization', value: 'Bearer token' };

  it('renders header key and value', () => {
    render(<HeaderItem header={header} onDelete={() => {}} />);
    expect(screen.getByText('Authorization')).toBeInTheDocument();
    expect(screen.getByText('Bearer token')).toBeInTheDocument();
    expect(screen.getByText(':')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<HeaderItem header={header} onDelete={handleDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /x/i }));
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(header);
  });
});
