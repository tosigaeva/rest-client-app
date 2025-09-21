'use server';

import { cookies } from 'next/headers';

import { ROUTES } from '@/constants';
import { adminAuth } from '@/lib/firebase-admin';

const MAX_AGE = 60 * 60 * 24;

export async function createSession(token: string) {
  const cookieName = process.env.SESSION_COOKIE_NAME;
  if (!cookieName) {
    throw new Error('SESSION_COOKIE_NAME environment variable is not set');
  }

  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    maxAge: MAX_AGE,
    path: ROUTES.MAIN,
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getCurrentUser() {
  const cookieName = process.env.SESSION_COOKIE_NAME || 'session';
  const sessionCookie = (await cookies()).get(cookieName);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const decodedSession = await adminAuth.verifyIdToken(sessionCookie.value);
    const userRecord = await adminAuth.getUser(decodedSession.uid);
    return {
      displayName: userRecord.displayName,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      token: sessionCookie.value,
      uid: userRecord.uid,
    };
  } catch {
    return null;
  }
}

export async function removeSession() {
  const cookieName = process.env.SESSION_COOKIE_NAME;
  if (!cookieName) {
    throw new Error('SESSION_COOKIE_NAME environment variable is not set');
  }

  (await cookies()).delete(cookieName);
}
