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

export const ROUTES = {
  ABOUT: '/about',
  API: '/api',
  HISTORY: '/history',
  MAIN: '/',
  NEXT: '/_next',
  REST: '/rest',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VARIABLES: '/variables',
  VERSEL: '/_vercel',
};

export const STYLE_BUTTON = `px-4 py-2 text-gray-700 font-caprasimo bg-fuchsia-300 border border-gray-300 rounded-md hover:bg-fuchsia-400 transition-colors cursor-pointer`;
