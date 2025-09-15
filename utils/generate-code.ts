import HTTPSnippet from 'httpsnippet';

import { RequestData } from '@/type';

import { replaceVariables } from './replace-variables';

export function generateCode(req: RequestData, target: string, client?: string, username?: string) {
  const variables = JSON.parse(localStorage.getItem(`variables-${username}`) || '{}');
  const processedUrl = replaceVariables(req.url, variables);
  const processedHeaders = Object.entries(req.headers ?? {}).map(([name, value]) => ({
    name,
    value: replaceVariables(value, variables),
  }));
  const processedBody = req.body ? replaceVariables(req.body, variables) : undefined;
  const request = {
    bodySize: processedBody ? processedBody.length : 0,
    cookies: [],
    headers: processedHeaders,
    headersSize: -1,
    httpVersion: 'HTTP/1.1',
    method: req.method,
    postData: processedBody
      ? {
          mimeType: 'application/json',
          text: processedBody,
        }
      : undefined,
    queryString: [],
    url: processedUrl,
  };

  const snippet = new HTTPSnippet(request);
  return snippet.convert(target, client) || 'Not enough data to generate code';
}
