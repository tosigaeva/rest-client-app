import { createUserWithEmailAndPassword } from '@firebase/auth';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';

import { auth } from '@/lib/firebase';

type FirebaseError = { code?: string; message?: string };

export const handleFirebaseError = <T extends FieldValues>(
  error: FirebaseError,
  setError?: UseFormSetError<T>,
) => {
  const { code, message } = error;

  switch (code) {
    case 'auth/email-already-in-use':
      setError?.('email' as Path<T>, { message: 'Email is already in use' });
      toast.error('Email is already in use');
      break;
    default:
      toast.error(message || 'Something went wrong');
      break;
  }
};

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
