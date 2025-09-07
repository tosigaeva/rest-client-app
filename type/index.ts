import { HTTP_METHODS } from '@/constants';

export interface Header {
  headerKey: string;
  value: string;
}

export interface Headers {
  body: string;
  header: Header;
  headers: Header[];
  method: HttpMethod;
  requestUrl: string;
  responce: string;
  url: string;
}

export type HttpMethod = (typeof HTTP_METHODS)[number];

export type { Locale } from '@/i18n/routing';
