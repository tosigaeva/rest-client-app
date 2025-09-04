export const AUTHOR_GITHUBS: { name: string; url: string }[] = [
  { name: 'Anastasiia', url: 'https://github.com/tosigaeva' },
  { name: 'Ekaterina', url: 'https://github.com/ekaterina-cat' },
  { name: 'Yulia', url: 'https://github.com/YuliaDemir' },
];

export const RSS_LINK = 'https://rs.school/courses/reactjs';

export const locales = ['en', 'ru', 'be'] as const;
export type Locale = (typeof locales)[number];

export const LANGUAGES = [
  { code: 'ru', name: 'Russian' },
  { code: 'en', name: 'English' },
  { code: 'be', name: 'Belarusian' },
];
