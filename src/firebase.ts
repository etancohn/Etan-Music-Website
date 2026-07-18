import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Client-side Firebase config (safe to ship — access is governed by
// firestore.rules / storage.rules, not by this key).
const firebaseConfig = {
    apiKey: 'AIzaSyDejTz39Mwl4BBbMAOFE4-VBPwQfcM_UCc',
    authDomain: 'etan-music-website.firebaseapp.com',
    projectId: 'etan-music-website',
    storageBucket: 'etan-music-website.firebasestorage.app',
    messagingSenderId: '539701752770',
    appId: '1:539701752770:web:bbd18a39a9c0db385d5c5b',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
