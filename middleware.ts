import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { ROUTES } from '@/constants';
import { AUTH_ROUTES, matchesRoute, validateSession } from '@/lib/auth-middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const authResponse = authMiddleware(request);

  if (authResponse.status === 302 || authResponse.status === 301) {
    return authResponse;
  }

  return intlMiddleware(request);
}

function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldSkip =
    AUTH_ROUTES.skip.some((route) => pathname.startsWith(route)) || pathname.includes('.');

  if (shouldSkip) {
    return NextResponse.next();
  }

  const isProtectedRoute = matchesRoute(pathname, AUTH_ROUTES.protected);
  const isAuthenticated = validateSession(request);

  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.SIGN_IN;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  runtime: 'experimental-edge',
};
