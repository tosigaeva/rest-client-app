'use client';

import { signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '@/lib/firebase';
import { signOutUser } from '@/lib/firebase-auth';

type AuthContextType = {
  signOut: () => Promise<void>;
  user: null | User;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await signOutUser();
    await firebaseSignOut(auth);
  };

  return <AuthContext.Provider value={{ signOut, user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
