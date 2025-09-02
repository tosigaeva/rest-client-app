import { Button } from '@/components/ui/button';
import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleTryAgain = () => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <section className="flex flex-col justify-center gap-6">
            <h1 className="font-bold uppercase">Something went wrong.</h1>
            <Button onClick={this.handleTryAgain}>Try Again</Button>
          </section>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;