export const locales = ['en', 'ru', 'be'] as const;
export type Locale = (typeof locales)[number];
