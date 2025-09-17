import { NextRequest } from 'next/server';

export function createLocaleAwareRedirect(
  request: NextRequest,
  targetPath: string,
  locale?: string,
): URL {
  const currentLocale = locale || extractLocale(request.nextUrl.pathname);
  const baseUrl = new URL(request.url);
  baseUrl.pathname = `/${currentLocale}${targetPath}`;
  return baseUrl;
}

export function extractLocale(pathname: string): string {
  const segments = pathname.split('/');
  return segments[1] || 'en';
}

export function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => pathname.includes(route));
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
