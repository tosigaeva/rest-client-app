export const AUTHOR_GITHUBS: { name: string; url: string }[] = [
  { name: 'Anastasiia', url: '' },
  { name: 'Ekaterina', url: '' },
  { name: 'Yulia', url: '' },
];

export const locales = ['en', 'ru', 'fr'] as const;
export type Locale = (typeof locales)[number];
