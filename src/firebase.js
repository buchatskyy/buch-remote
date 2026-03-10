import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsPkCR4un_1Dh4RJum5QMQWLnllmmq2U0",
  authDomain: "buchatskyy-82df6.firebaseapp.com",
  projectId: "buchatskyy-82df6",
  storageBucket: "buchatskyy-82df6.firebasestorage.app",
  messagingSenderId: "819520952063",
  appId: "1:819520952063:web:67b63b1b2b8c8711ebdeca"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();