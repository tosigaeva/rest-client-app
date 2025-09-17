import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import {
  AUTH_ROUTES,
  createLocaleAwareRedirect,
  matchesRoute,
  validateSession,
} from '@/lib/auth-middleware';

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
  const isPublicRoute = matchesRoute(pathname, AUTH_ROUTES.public);
  const isAuthenticated = validateSession(request);

  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = createLocaleAwareRedirect(request, '/sign-in');
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && isPublicRoute) {
    const mainUrl = createLocaleAwareRedirect(request, '/');
    return NextResponse.redirect(mainUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
