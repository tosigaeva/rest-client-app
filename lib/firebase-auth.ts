import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@firebase/auth';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';

import { auth } from '@/lib/firebase';

type FirebaseError = { code?: string; message?: string };

export const handleFirebaseError = <T extends FieldValues>(
  error: FirebaseError,
  t: (key: string) => string,
  setError?: UseFormSetError<T>,
) => {
  const { code, message } = error;

  switch (code) {
    case 'auth/email-already-in-use':
      setError?.('email' as Path<T>, { message: t('toasts.in-use') });
      toast.error(t('toasts.in-use'));
      break;
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      setError?.('email' as Path<T>, { message: t('toasts.invalid') });
      setError?.('password' as Path<T>, { message: t('toasts.invalid') });
      toast.error(t('toasts.invalid'));
      break;
    default:
      toast.error(message || t('toasts.unknown'));
      break;
  }
};

export const registerUser = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

export const signInUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
