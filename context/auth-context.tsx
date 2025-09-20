'use client';

import { signOut as firebaseSignOut } from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { signOutUser } from '@/lib/firebase-auth';

export const signOut = async () => {
  await signOutUser();
  await firebaseSignOut(auth);
};
