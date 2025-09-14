import { render, screen } from '@testing-library/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { describe, expect, it } from 'vitest';

import { RootState } from '@/store/store';

import { Wrapper } from './wrapper';

describe('Wrapper', () => {
  it('renders children inside the Redux provider', () => {
    render(
      <Wrapper>
        <div data-testid="child">Test Child</div>
      </Wrapper>,
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Test Child');
  });

  it('provides access to the Redux store', () => {
    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    const stateValue = screen.getByTestId('state-value');
    expect(stateValue).toHaveTextContent('GET');
  });
});

const TestComponent = () => {
  const method = useSelector((state: RootState) => state.restData.method);
  return <div data-testid="state-value">{method}</div>;
};
