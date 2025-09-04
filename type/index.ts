export const locales = ['en', 'ru', 'be'] as const;
export interface Header {
  headerKey: string;
  value: string;
}

export interface Headers {
  header: Header;
  headers: Header[];
}

export type Locale = (typeof locales)[number];
