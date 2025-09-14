import { Header } from '@/type';

export const DEVELOPERS: { git: string; name: string }[] = [
  { git: 'https://github.com/YuliaDemir', name: 'Yulia' },
  { git: 'https://github.com/tosigaeva', name: 'Anastasiia' },
  { git: 'https://github.com/ekaterina-cat', name: 'Katsiaryna' },
];

export const RSS_LINK = 'https://rs.school/courses/reactjs';

export const ICON = '/icon1.png';

export const locales = ['en', 'ru', 'be'] as const;
export type Locale = (typeof locales)[number];

export const EMPTY_HEADER: Header = { headerKey: '', value: '' };

export const HTTP_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'CONNECT',
  'TRACE',
] as const;

export enum PROGRAMMING_LANGUAGES {
  'C#' = 'csharp',
  'curl' = 'shell',
  'Go' = 'go',
  'Java' = 'java',
  'JavaScript (Fetch api)' = 'javascript',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  'JavaScript (XHR)' = 'javascript',
  'NodeJS' = 'node',
  'Python' = 'python',
}
