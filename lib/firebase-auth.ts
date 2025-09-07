import { createUserWithEmailAndPassword } from '@firebase/auth';

import { auth } from '@/lib/firebase';

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
