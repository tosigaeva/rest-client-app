import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RequestLog } from '@/lib/history';

import { HistoryItem } from './history-item';

const mockRequestLog: RequestLog = {
  baseUrl: 'https://api.example.com',
  body: '{"name": "John"}',
  error: null,
  headers: { 'Content-Type': 'application/json' },
  id: 'test-id',
  latency: 150,
  method: 'GET',
  requestSize: 1024,
  responseSize: 2048,
  status: 200,
  timestamp: '2024-01-15T10:30:00.000Z',
  url: 'https://api.example.com/users',
  userId: 'user-123',
};

describe('HistoryItem', () => {
  describe('Basic Rendering', () => {
    it('renders request information correctly', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      expect(screen.getByText('GET')).toBeInTheDocument();
      expect(screen.getByText('https://api.example.com')).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
      expect(screen.getByText('150ms')).toBeInTheDocument();
      expect(screen.getByText('1024B')).toBeInTheDocument();
      expect(screen.getByText('2048B')).toBeInTheDocument();
    });

    it('renders as a list item with correct structure', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveClass(
        'cursor-pointer',
        'rounded-md',
        'border-neutral-100',
        'bg-white',
        'p-4',
        'shadow',
        'transition',
        'hover:shadow-md',
      );
    });

    it('renders as a clickable link with correct URL', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://api.example.com/users');
    });

    it('renders timestamp in correct format', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const timestampText = screen.getByText(/Mon Jan 15 2024/);
      expect(timestampText).toBeInTheDocument();
    });
  });

  describe('Status Code Colors', () => {
    it('applies correct status color for different status codes', () => {
      const successLog = { ...mockRequestLog, status: 200 };
      const errorLog = { ...mockRequestLog, status: 404 };
      const redirectLog = { ...mockRequestLog, status: 301 };

      const { rerender } = render(<HistoryItem doc={successLog} />);
      expect(screen.getByText('200')).toHaveClass('bg-green-100', 'text-green-600');

      rerender(<HistoryItem doc={errorLog} />);
      expect(screen.getByText('404')).toHaveClass('bg-red-100', 'text-red-600');

      rerender(<HistoryItem doc={redirectLog} />);
      expect(screen.getByText('301')).toHaveClass('bg-blue-100', 'text-blue-600');
    });

    it('applies gray color for unknown status codes', () => {
      const unknownLog = { ...mockRequestLog, status: 99 };

      render(<HistoryItem doc={unknownLog} />);

      expect(screen.getByText('99')).toHaveClass('bg-gray-100', 'text-gray-600');
    });

    it('handles edge case status codes correctly', () => {
      const testCases = [
        { expectedClass: 'bg-gray-100 text-gray-600', status: 199 },
        { expectedClass: 'bg-green-100 text-green-600', status: 299 },
        { expectedClass: 'bg-blue-100 text-blue-600', status: 399 },
        { expectedClass: 'bg-red-100 text-red-600', status: 499 },
        { expectedClass: 'bg-red-100 text-red-600', status: 599 },
      ];

      testCases.forEach(({ expectedClass, status }) => {
        const log = { ...mockRequestLog, status };
        const { unmount } = render(<HistoryItem doc={log} />);

        const statusElement = screen.getByText(status.toString());
        expect(statusElement).toHaveClass(...expectedClass.split(' '));

        unmount();
      });
    });
  });

  describe('HTTP Method Colors', () => {
    it('applies correct method color for different HTTP methods', () => {
      const testCases = [
        { expectedClass: 'text-blue-600', method: 'GET' },
        { expectedClass: 'text-green-600', method: 'POST' },
        { expectedClass: 'text-red-600', method: 'DELETE' },
        { expectedClass: 'text-purple-600', method: 'PUT' },
        { expectedClass: 'text-purple-600', method: 'PATCH' },
        { expectedClass: 'text-purple-600', method: 'HEAD' },
        { expectedClass: 'text-purple-600', method: 'OPTIONS' },
      ];

      testCases.forEach(({ expectedClass, method }) => {
        const log = { ...mockRequestLog, method };
        const { unmount } = render(<HistoryItem doc={log} />);

        const methodElement = screen.getByText(method);
        expect(methodElement).toHaveClass(expectedClass);

        unmount();
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error message when error is present', () => {
      const errorLog = { ...mockRequestLog, error: 'Network timeout' };

      render(<HistoryItem doc={errorLog} />);

      expect(screen.getByText('Network timeout')).toBeInTheDocument();
    });

    it('does not display error section when error is null', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const errorSection = screen.queryByText(/Network timeout/);
      expect(errorSection).not.toBeInTheDocument();
    });

    it('does not display error section when error is undefined', () => {
      const logWithoutError = { ...mockRequestLog, error: null };
      render(<HistoryItem doc={logWithoutError} />);

      const errorSection = screen.queryByText(/Network timeout/);
      expect(errorSection).not.toBeInTheDocument();
    });

    it('displays different error messages correctly', () => {
      const errorMessages = [
        'Connection refused',
        'Timeout of 5000ms exceeded',
        'CORS error',
        'Invalid JSON response',
      ];

      errorMessages.forEach((errorMessage) => {
        const errorLog = { ...mockRequestLog, error: errorMessage };
        const { unmount } = render(<HistoryItem doc={errorLog} />);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe('Data Display', () => {
    it('displays latency with correct unit', () => {
      const log = { ...mockRequestLog, latency: 2500 };
      render(<HistoryItem doc={log} />);

      expect(screen.getByText('2500ms')).toBeInTheDocument();
    });

    it('displays request size with correct unit', () => {
      const log = { ...mockRequestLog, requestSize: 512 };
      render(<HistoryItem doc={log} />);

      expect(screen.getByText('512B')).toBeInTheDocument();
    });

    it('displays response size with correct unit', () => {
      const log = { ...mockRequestLog, responseSize: 4096 };
      render(<HistoryItem doc={log} />);

      expect(screen.getByText('4096B')).toBeInTheDocument();
    });

    it('handles zero values correctly', () => {
      const log = { ...mockRequestLog, latency: 0, requestSize: 0, responseSize: 0 };
      render(<HistoryItem doc={log} />);

      expect(screen.getByText('0ms')).toBeInTheDocument();
      const zeroBTexts = screen.getAllByText('0B');
      expect(zeroBTexts).toHaveLength(2);
    });

    it('handles large values correctly', () => {
      const log = { ...mockRequestLog, latency: 999999, requestSize: 999999, responseSize: 999999 };
      render(<HistoryItem doc={log} />);

      expect(screen.getByText('999999ms')).toBeInTheDocument();
      const largeBTexts = screen.getAllByText('999999B');
      expect(largeBTexts).toHaveLength(2);
    });
  });

  describe('URL and Base URL Handling', () => {
    it('displays full URL in link href', () => {
      const log = { ...mockRequestLog, url: 'https://api.example.com/users?page=1&limit=10' };
      render(<HistoryItem doc={log} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://api.example.com/users?page=1&limit=10');
    });

    it('displays base URL in visible text', () => {
      const log = { ...mockRequestLog, baseUrl: 'https://api.github.com' };
      render(<HistoryItem doc={log} />);

      expect(screen.getByText('https://api.github.com')).toBeInTheDocument();
    });

    it('handles different URL formats', () => {
      const testCases = [
        'https://api.example.com',
        'http://localhost:3000',
        'https://subdomain.example.com/api/v1',
        'https://api.example.com:8080',
      ];

      testCases.forEach((baseUrl) => {
        const log = { ...mockRequestLog, baseUrl, url: `${baseUrl}/test` };
        const { unmount } = render(<HistoryItem doc={log} />);

        expect(screen.getByText(baseUrl)).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', `${baseUrl}/test`);

        unmount();
      });
    });
  });

  describe('Timestamp Formatting', () => {
    it('formats different timestamps correctly', () => {
      const testCases = [
        '2024-01-01T00:00:00.000Z',
        '2024-12-31T23:59:59.999Z',
        '2024-06-15T12:30:45.123Z',
      ];

      testCases.forEach((timestamp) => {
        const log = { ...mockRequestLog, timestamp };
        const { unmount } = render(<HistoryItem doc={log} />);

        const date = new Date(timestamp).toDateString();
        const time = new Date(timestamp).toLocaleTimeString();

        expect(screen.getByText(`${date} ${time}`)).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to main container', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveClass(
        'cursor-pointer',
        'rounded-md',
        'border-neutral-100',
        'bg-white',
        'p-4',
        'shadow',
        'transition',
        'hover:shadow-md',
      );
    });

    it('applies correct CSS classes to status badge', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const statusBadge = screen.getByText('200');
      expect(statusBadge).toHaveClass('rounded', 'px-2', 'py-1', 'text-xs', 'font-medium');
    });

    it('applies correct CSS classes to method text', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const methodText = screen.getByText('GET');
      expect(methodText).toHaveClass('font-semibold');
    });

    it('applies correct CSS classes to metrics section', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const metricsSection = screen.getByText('150ms').closest('div')?.parentElement;
      expect(metricsSection).toHaveClass(
        'mt-3',
        'flex',
        'flex-wrap',
        'gap-4',
        'text-xs',
        'text-gray-600',
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const listItem = screen.getByRole('listitem');
      const link = screen.getByRole('link');

      expect(listItem).toBeInTheDocument();
      expect(link).toBeInTheDocument();
      expect(link.closest('li')).toBe(listItem);
    });

    it('provides meaningful link text through URL', () => {
      render(<HistoryItem doc={mockRequestLog} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://api.example.com/users');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string values gracefully', () => {
      const log = { ...mockRequestLog, baseUrl: '', error: '' };
      render(<HistoryItem doc={log} />);

      expect(screen.getByRole('listitem')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();

      expect(screen.getByText('GET')).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
    });

    it('handles very long URLs', () => {
      const longUrl =
        'https://api.example.com/very/long/path/with/many/segments/and/parameters?param1=value1&param2=value2&param3=value3';
      const log = { ...mockRequestLog, url: longUrl };
      render(<HistoryItem doc={log} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', longUrl);
    });

    it('handles special characters in URLs', () => {
      const specialUrl = 'https://api.example.com/test?query=hello%20world&special=@#$%';
      const log = { ...mockRequestLog, url: specialUrl };
      render(<HistoryItem doc={log} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', specialUrl);
    });
  });
});
