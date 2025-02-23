import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
   signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCg4y2TT4ImwOJKg1Y7zTq2ArPQwPY5t3w",
  authDomain: "style-sprint.firebaseapp.com",
  projectId: "style-sprint",
  storageBucket: "style-sprint.appspot.com",
  messagingSenderId: "409842894878",
  appId: "1:409842894878:web:acd39bdb14439a208c860f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut ,createUserWithEmailAndPassword, signInWithEmailAndPassword};
