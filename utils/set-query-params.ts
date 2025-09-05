import { encode } from 'js-base64';

import { Header, HttpMethod } from '@/type';

export function setQueryParams(method: HttpMethod, url: string, body: string, headers: Header[]) {
  const encodedUrl = encode(url);
  const encodedBody = body ? encode(body) : undefined;

  const query = new URLSearchParams();
  headers.forEach(({ headerKey, value }) => query.set(headerKey, encodeURIComponent(value)));
  if (encodedBody) query.set('body', encodedBody);

  return `/${method}/${encodedUrl}?${query.toString()}`;
}
