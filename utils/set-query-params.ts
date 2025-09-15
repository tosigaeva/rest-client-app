import { encode } from 'js-base64';

import { Header, HttpMethod } from '@/type';

export function setQueryParams(method: HttpMethod, url: string, body: string, headers: Header[]) {
  const encodedUrl = encode(url);
  const encodedBody = body ? encode(body) : undefined;

  let path = `/rest/${method}/${encodedUrl}`;
  if (encodedBody) {
    path += `/${encodedBody}`;
  }

  const query = new URLSearchParams();
  headers.forEach(({ headerKey, value }) => query.append(headerKey, encodeURIComponent(value)));

  return `${path}?${query.toString()}`;
}
