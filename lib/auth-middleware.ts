import { NextRequest } from 'next/server';

import { ROUTES } from '@/constants';
import { routing } from '@/i18n/routing';

const LOCALE_REGEX = new RegExp(`^/(${routing.locales.join('|')})/`);

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'session';

export function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    const pathWithoutLocale = pathname.replace(LOCALE_REGEX, '/');
    return pathWithoutLocale.startsWith(route);
  });
}

export function validateSession(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  return !!sessionCookie?.value;
}

export const AUTH_ROUTES = {
  protected: [ROUTES.REST, ROUTES.HISTORY, ROUTES.VARIABLES] as string[],
  public: [ROUTES.SIGN_IN, ROUTES.SIGN_UP] as string[],
  skip: [ROUTES.API, ROUTES.NEXT, ROUTES.VERSEL] as string[],
};
