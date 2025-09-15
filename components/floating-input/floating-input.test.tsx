import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { FloatingInput } from './floating-input';

function Wrapper({ errorMessage }: { errorMessage?: string }) {
  const methods = useForm<{ username: string }>({
    defaultValues: { username: '' },
  });

  return (
    <FormProvider {...methods}>
      <FloatingInput
        control={methods.control}
        error={errorMessage ? { message: errorMessage, type: 'manual' } : undefined}
        label="Username"
        name="username"
      />
    </FormProvider>
  );
}

describe('FloatingInput', () => {
  it('renders input and label', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    render(<Wrapper errorMessage="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('applies error styles when error is present', () => {
    render(<Wrapper errorMessage="Invalid" />);
    const input = screen.getByLabelText('Username');
    expect(input).toHaveClass('border-red-500');
  });

  it('updates value when user types', () => {
    render(<Wrapper />);
    const input = screen.getByLabelText('Username') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'John' } });
    expect(input.value).toBe('John');
  });

  it('floats label when input has value', () => {
    render(<Wrapper />);
    const input = screen.getByLabelText('Username') as HTMLInputElement;
    const label = screen.getByText('Username');

    expect(label).toHaveClass('peer-placeholder-shown:text-base');

    fireEvent.change(input, { target: { value: 'Test' } });
    expect(label).toHaveClass('-top-2');
  });
});
