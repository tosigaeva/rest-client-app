import { Header } from '@/type';

export const AUTHOR_GITHUBS: { name: string; url: string }[] = [
  { name: 'Anastasiia', url: 'https://github.com/tosigaeva' },
  { name: 'Ekaterina', url: 'https://github.com/ekaterina-cat' },
  { name: 'Yulia', url: 'https://github.com/YuliaDemir' },
];

export const RSS_LINK = 'https://rs.school/courses/reactjs';

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
