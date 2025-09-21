import { HTTP_METHODS, PROGRAMMING_LANGUAGES } from '@/constants';

export type AppProps = {
  user?: null | ServerUser;
};

export type GeneratedCodeArguments = {
  body?: string;
  headers?: Header[];
  method: string;
  url: string;
};

export interface Header {
  headerKey: string;
  value: string;
}

export type { Locale } from '@/i18n/routing';

export interface Headers {
  body: string;
  header: Header;
  headers: Header[];
  method: HttpMethod;
  requestUrl: string;
  response: string;
  url: string;
}

export type HttpMethod = (typeof HTTP_METHODS)[number];

export type ProgrammingLanguages = keyof typeof PROGRAMMING_LANGUAGES;

export type RequestData = {
  body?: string;
  headers?: Record<string, string>;
  method: string;
  url: string;
};

export type RowType = {
  saved: boolean;
  value: string;
  variable: string;
};

export type ServerUser = {
  displayName: string | undefined;
  email: string | undefined;
  emailVerified: boolean;
  token: string;
  uid: string;
};
