import { encode } from 'js-base64';

import { Header, HttpMethod, Locale } from '@/type';

export function setQueryParams(
  locale: Locale,
  method: HttpMethod,
  url: string,
  body: string,
  headers: Header[],
) {
  const encodedUrl = encode(url);
  const encodedBody = body ? encode(body) : undefined;

  let path = `/${locale}/rest/${method}/${encodedUrl}`;
  if (encodedBody) {
    path += `/${encodedBody}`;
  }

  const query = new URLSearchParams();
  headers.forEach(({ headerKey, value }) => query.append(headerKey, encode(value)));

  return `${path}?${query.toString()}`;
}
