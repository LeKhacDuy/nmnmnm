import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCqs8A8NQFmDXt6fdcddknZ51w9eyNp5sc",
    authDomain: "nearme-app-3d234.firebaseapp.com",
    projectId: "nearme-app-3d234",
    storageBucket: "nearme-app-3d234.firebasestorage.app",
    messagingSenderId: "216161420858",
    appId: "1:216161420858:web:9cd1ab0ff4f5d82b1c5703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
