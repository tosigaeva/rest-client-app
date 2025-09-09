import HTTPSnippet from 'httpsnippet';

import { RequestData } from '@/type';

export function generateCode(req: RequestData, target: string, client?: string) {
  const request = {
    bodySize: req.body ? req.body.length : 0,
    cookies: [],
    headers: Object.entries(req.headers ?? {}).map(([name, value]) => ({
      name,
      value,
    })),
    headersSize: -1,
    httpVersion: 'HTTP/1.1',
    method: req.method,
    postData: req.body
      ? {
          mimeType: 'application/json',
          text: req.body,
        }
      : undefined,
    queryString: [],
    url: req.url,
  };

  console.log('--------> ', request);
  const snippet = new HTTPSnippet(request);
  return snippet.convert(target, client) || 'Not enough data to generate code';
}
