import { NextRequest } from 'next/server';

export function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}\//, '/');
    return pathWithoutLocale.startsWith(route);
  });
}

export function validateSession(request: NextRequest): boolean {
  const sessionCookieName = process.env.SESSION_COOKIE_NAME || 'session';
  const sessionCookie = request.cookies.get(sessionCookieName);
  return !!sessionCookie?.value;
}

export const AUTH_ROUTES = {
  protected: ['/rest', '/history', '/variables'] as string[],
  public: ['/sign-in', '/sign-up', '/about-us'] as string[],
  skip: ['/api', '/_next', '/_vercel'] as string[],
};
