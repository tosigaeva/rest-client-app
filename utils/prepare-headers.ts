import { Header } from '@/type';

export function prepareHeaders(headers: Header[]): Record<string, string> {
  const preparedHeaders: Record<string, string> = {};

  headers.forEach((header) => (preparedHeaders[header.headerKey] = header.value));
  return preparedHeaders;
}
