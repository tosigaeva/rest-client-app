import { Header } from '@/type';

export const AUTHOR_GITHUBS: { name: string; url: string }[] = [
  { name: 'Anastasiia', url: 'https://github.com/tosigaeva' },
  { name: 'Ekaterina', url: 'https://github.com/ekaterina-cat' },
  { name: 'Yulia', url: 'https://github.com/YuliaDemir' },
];

export const RSS_LINK = 'https://rs.school/courses/reactjs';

export const DEVELOPERS = [
  {
    description:
      'Master of transforming code into culinary masterpieces. Each line is an ingredient in the perfect solution.',
    git: 'https://github.com/YuliaDemir',
    image: '/icon1.png',
    major: 'Captain of the Kitchen | Team Lead, Developer',
    name: 'Yulia',
  },
  {
    description:
      'Digital chef who turns complex problems into delicious solutions, serving innovation one line of code at a time.',
    git: 'https://github.com/tosigaeva',
    image: '/icon1.png',
    major: 'Master Chef of Solutions, Developer',
    name: 'Anastasiia',
  },
  {
    description:
      'Master of digital presentation, where every style is an ingredient of the perfect UI',
    git: 'https://github.com/ekaterina-cat',
    image: '/icon1.png',
    major: 'Cooking Code, Developer',
    name: 'Katsiaryna',
  },
];
export const locales = ['en', 'ru', 'be'] as const;
export type Locale = (typeof locales)[number];

export const EMPTY_HEADER: Header = { headerKey: '', value: '' };
