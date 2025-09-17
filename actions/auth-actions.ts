'use server';

import { cookies } from 'next/headers';

import { adminAuth } from '@/lib/firebase-admin';

export async function createSession(uid: string) {
  const cookieName = process.env.SESSION_COOKIE_NAME;
  if (!cookieName) {
    throw new Error('SESSION_COOKIE_NAME environment variable is not set');
  }

  (await cookies()).set(cookieName, uid, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
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
    const userRecord = await adminAuth.getUser(sessionCookie.value);
    return {
      displayName: userRecord.displayName,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
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
