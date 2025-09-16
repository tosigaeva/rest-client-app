import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDD3V4Avo0aa7o-e-4c5tU8PxDIWDAjdBo',
  appId: '1:981917200623:web:32834d783ab9af2d002b1a',
  authDomain: 'restcafe-3cc28.firebaseapp.com',
  measurementId: 'G-VTM069TR23',
  messagingSenderId: '981917200623',
  projectId: 'restcafe-3cc28',
  storageBucket: 'restcafe-3cc28.firebasestorage.app',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
