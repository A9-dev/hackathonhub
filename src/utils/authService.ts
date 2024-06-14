// src/utils/authService.ts
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const monitorAuthState = (callback: (user: any) => void) => {
    onAuthStateChanged(auth, user => {
        callback(user);
    });
};
